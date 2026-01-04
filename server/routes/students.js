import { Router } from "express";
import { createStudentController, getAllStudentsController, getStudentByIdController,  } from "../controllers/students.js";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";


const studentsRouter = Router();

studentsRouter.get('/students', ctrllWrapper(getAllStudentsController));

studentsRouter.get('/students/:studentId', ctrllWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrllWrapper(createStudentController));


export default studentsRouter;
