import { Router } from "express";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";
import { loginController, logoutController, refreshController, registerController, resetEmailController,  } from "../controllers/auth.js";
import { validateBody } from "../src/middlewars/validateBody.js";
import { registerSchema } from "../validationSchema/registerSchema.js";
import { loginSchema } from "../validationSchema/loginSchema.js";
import { createResetEmailSchema } from "../validationSchema/resetEmailSchema.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), ctrllWrapper(registerController));
authRouter.post('/login', validateBody(loginSchema), ctrllWrapper(loginController));
authRouter.post('/refresh', ctrllWrapper(refreshController));
authRouter.post('/logout', ctrllWrapper(logoutController));
authRouter.post('/request-reset-password', validateBody(createResetEmailSchema), ctrllWrapper(resetEmailController));




export default authRouter;
