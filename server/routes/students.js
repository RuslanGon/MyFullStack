import { Router } from "express";
import { getAllStudentsController, getStudentByIdController, postStudentController } from "../controllers/students.js";
import { ctrllWrapper } from "../src/utils/ctrlWrapper.js";


const studentsRouter = Router();

studentsRouter.get('/students', ctrllWrapper(getAllStudentsController));

studentsRouter.get('/students/:studentId', ctrllWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrllWrapper(postStudentController));


export default studentsRouter;
