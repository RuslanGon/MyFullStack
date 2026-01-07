import { createUser, loginUser } from "../src/services/auth.js";

export const registerController = async (req,res, next) => {
const user = await createUser(req.body);

res.json({
    status: 200,
    message: 'Register new user',
    data: user,
  });
};

export const loginController = async (req, res, next) => {
  try {
    const session = await loginUser(req.body);

    res.cookie('sessionId', session.user._id.toString(), {
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
        refreshToken: session.refreshToken
      },
    });
  } catch (err) {
    console.error('Login error:', err); // ← реальный stack trace
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
