import {
  createUser,
  loginUser,
  logoutUser,
  refreshUser,
  resetEmail,
  resetPassword,
} from '../src/services/auth.js';

/* ================= REGISTER ================= */

export const registerController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    res.json({
      status: 200,
      message: 'Register new user',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/* ================= LOGIN ================= */

export const loginController = async (req, res, next) => {
  try {
    const session = await loginUser(req.body);

    res.cookie('sessionId', session.sessionId.toString(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      status: 200,
      message: 'User is logined in',
      data: {
        user: session.user,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    next(err);
  }
};

/* ================= LOGOUT ================= */

export const logoutController = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    await logoutUser(sessionId);

    res.clearCookie('sessionId', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      status: 200,
      message: 'User successfully logged out',
    });
  } catch (err) {
    console.error('Logout error:', err);
    next(err);
  }
};

/* ================= REFRESH ================= */

export const refreshController = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    const data = await refreshUser(sessionId);

    res.json({
      status: 200,
      message: 'Access token refreshed',
      data,
    });
  } catch (err) {
    console.error('Refresh error:', err);
    next(err);
  }
};

/* ================= Reset email ================= */

export const resetEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await resetEmail(email);
    res.json({
      status: 200,
      message: 'Password reset email successfully sent',
      data: result
    });
  } catch (err) {
    console.error('Reset email error:', err); // ← очень важно
    res.status(500).json({
      status: 500,
      message: err.message,
      stack: err.stack
    });
  }
};

/* ================= Reset password ================= */

export const resetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const result = await resetPassword(email);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

    // export const loginController = async (req,res, next) => {
    //   const user = await loginUser(req.body);

    //   res.json({
    //       status: 200,
    //       message: 'User is logined in',
    //       data: user,
    //     });
    //   };

