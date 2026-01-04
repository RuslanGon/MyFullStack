import { Router } from "express";
import { createStudentController, deleteStudentByIdController, getAllStudentsController, getStudentByIdController, patchStudentController, putStudentController,  } from "../controllers/students.js";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";
import { validateMongoId } from "../src/middlewars/validateMongoId.js";


const studentsRouter = Router();

studentsRouter.get('/students', ctrllWrapper(getAllStudentsController));

studentsRouter.get(
  '/students/:studentId',
  validateMongoId,
  ctrllWrapper(getStudentByIdController),
);

studentsRouter.post('/students',
ctrllWrapper(createStudentController));

studentsRouter.delete(
  '/students/:studentId',
  validateMongoId,
  ctrllWrapper(deleteStudentByIdController),
);

studentsRouter.patch(
  '/students/:studentId',
  validateMongoId,
  ctrllWrapper(patchStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  validateMongoId,
  ctrllWrapper(putStudentController),
);





export default studentsRouter;
