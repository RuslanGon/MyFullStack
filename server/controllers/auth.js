import { createUser } from "../src/services/auth.js";

export const registerController = async (req,res, next) => {
const user = await createUser(req.body);

res.json({
    status: 200,
    message: 'Register new user',
    data: user,
  });
};
