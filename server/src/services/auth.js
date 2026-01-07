import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { Session } from "../db/models/session.js";

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  await Session.deleteOne({userId: user._id});

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
    user,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
};

