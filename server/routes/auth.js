import { Router } from "express";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";
import { registerController } from "../controllers/auth.js";
import { validateBody } from "../src/middlewars/validateBody.js";
import { registerSchema } from "../validationSchema/registerSchema.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), ctrllWrapper(registerController));
// authRouter.post('/login');
// authRouter.post('/refresh-token');
// authRouter.post('/logout');




export default authRouter;
