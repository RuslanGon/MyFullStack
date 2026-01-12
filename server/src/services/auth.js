import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';
import { sendMail } from '../utils/sendMail.js';

/* ================= REGISTER ================= */

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

/* ================= LOGIN ================= */

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = crypto.randomBytes(30).toString('hex');
  const refreshToken = crypto.randomBytes(40).toString('hex');

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    sessionId: session._id,
    user,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
};

/* ================= LOGOUT ================= */

export const logoutUser = async (sessionId) => {
  if (!sessionId) return false;

  const result = await Session.deleteOne({ _id: sessionId });
  return result.deletedCount > 0;
};

/* ================= REFRESH ================= */

export const refreshUser = async (sessionId) => {
  if (!sessionId) {
    throw createHttpError(401, 'No session cookie');
  }

  const session = await Session.findById(sessionId);

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token expired');
  }

  const newAccessToken = crypto.randomBytes(30).toString('hex');

  session.accessToken = newAccessToken;
  session.accessTokenValidUntil = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await session.save();

  return {
    accessToken: newAccessToken,
  };
};

/* ================= resetEmail ================= */

export const resetEmail = async (email) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    env(ENV_VARS.JWT_SECRET), // твой секрет из env
    { expiresIn: '1h' } // токен живёт 1 час
  );

  // 3️⃣ Ссылка для фронтенда или Postman
  const resetLink = `http://localhost:3001/reset-password?token=${token}`;

  // 4️⃣ Отправляем письмо
  await sendMail({
    to: email,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset.</p>
      <p>Click this link to reset your password:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Token expires in 1 hour.</p>
    `,
  });

  // 5️⃣ Возвращаем токен (для логов или теста в Postman)
  return { message: 'Reset email sent', email, token };
};
