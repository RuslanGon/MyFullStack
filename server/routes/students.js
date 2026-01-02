import { Router } from "express";
import { getAllStudentsController, getStudentByIdController } from "../controllers/students.js";


const studentsRouter = Router();

studentsRouter.get('/students', getAllStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

export default studentsRouter;
