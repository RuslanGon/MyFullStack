import { Router } from "express";
import { createStudentController, deleteStudentByIdController, getAllStudentsController, getStudentByIdController, patchStudentController, putStudentController,  } from "../controllers/students.js";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";
import { validateMongoId } from "../src/middlewars/validateMongoId.js";
import { validateBody } from "../src/middlewars/validateBody.js";
import { createStudentSchema } from "../validationSchema/createStudentSchema.js";
import { updateStudentSchema } from "../validationSchema/updateStudentSchema.js";
import { authenticate } from "../src/middlewars/authenticate.js";
import { upload } from "../src/middlewars/upload.js";


const studentsRouter = Router();

studentsRouter.get('/students', ctrllWrapper(getAllStudentsController));

studentsRouter.get(
  '/students/:studentId',
  authenticate,
  validateMongoId,
  ctrllWrapper(getStudentByIdController),
);

studentsRouter.post('/students',
upload.single('avatar'),
validateBody(createStudentSchema),
ctrllWrapper(createStudentController));

studentsRouter.delete(
  '/students/:studentId',
  validateMongoId,
  ctrllWrapper(deleteStudentByIdController),
);

studentsRouter.patch(
  '/students/:studentId',
  validateBody(updateStudentSchema),
  validateMongoId,
  ctrllWrapper(patchStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  validateBody(createStudentSchema),
  validateMongoId,
  ctrllWrapper(putStudentController),
);

export default studentsRouter;
