import { Router } from "express";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";
import { loginController, logoutController, refreshController, registerController, resetEmailController, resetPasswordController,  } from "../controllers/auth.js";
import { validateBody } from "../src/middlewars/validateBody.js";
import { registerSchema } from "../validationSchema/registerSchema.js";
import { loginSchema } from "../validationSchema/loginSchema.js";
import { createResetEmailSchema } from "../validationSchema/resetEmailSchema.js";
import { resetPasswordSchema } from "../validationSchema/resetPasswordSchema.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), ctrllWrapper(registerController));
authRouter.post('/login', validateBody(loginSchema), ctrllWrapper(loginController));
authRouter.post('/refresh', ctrllWrapper(refreshController));
authRouter.post('/logout', ctrllWrapper(logoutController));
authRouter.post('/request-reset-email', validateBody(createResetEmailSchema), ctrllWrapper(resetEmailController));
authRouter.post('/request-reset-password', validateBody(resetPasswordSchema), ctrllWrapper(resetPasswordController));




export default authRouter;
