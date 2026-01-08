import { Router } from "express";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";
import { loginController, logoutController, refreshController, registerController } from "../controllers/auth.js";
import { validateBody } from "../src/middlewars/validateBody.js";
import { registerSchema } from "../validationSchema/registerSchema.js";
import { loginSchema } from "../validationSchema/loginSchema.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), ctrllWrapper(registerController));
authRouter.post('/login', validateBody(loginSchema), ctrllWrapper(loginController));
authRouter.post('/refresh', ctrllWrapper(refreshController));
authRouter.post('/logout', ctrllWrapper(logoutController));




export default authRouter;
