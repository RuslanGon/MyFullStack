import { Router } from "express";
import { createStudentController, deleteStudentByIdController, getAllStudentsController, getStudentByIdController, patchStudentController,  } from "../controllers/students.js";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";


const studentsRouter = Router();

studentsRouter.get('/students', ctrllWrapper(getAllStudentsController));

studentsRouter.get('/students/:studentId', ctrllWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrllWrapper(createStudentController));

studentsRouter.delete('/students/:studentId', ctrllWrapper(deleteStudentByIdController));

studentsRouter.patch('/students/:studentId', ctrllWrapper(patchStudentController));




export default studentsRouter;
