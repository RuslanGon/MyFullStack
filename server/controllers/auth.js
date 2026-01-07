import { createUser, loginUser } from "../src/services/auth.js";

export const registerController = async (req,res, next) => {
const user = await createUser(req.body);

res.json({
    status: 200,
    message: 'Register new user',
    data: user,
  });
};

export const loginController = async (req,res, next) => {
    const session = await loginUser(req.body);

    res.json({
        status: 200,
        message: 'User is logined in',
        data: {accessToken: session.accessToken},
      });
    };

    // export const loginController = async (req,res, next) => {
    //   const user = await loginUser(req.body);

    //   res.json({
    //       status: 200,
    //       message: 'User is logined in',
    //       data: user,
    //     });
    //   };
