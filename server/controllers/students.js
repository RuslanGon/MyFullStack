import {getAllStudents, getStudentById} from '../src/services/students.js';

export const getAllStudentsController = async(req, res) => {
    const students = await getAllStudents();
    res.json({
  status: 200,
  message: 'get all students',
  data: students
    });
  };

export const getStudentByIdController = async  (req, res, next) => {
    const id =req.params.studentId;
    const student = await getStudentById(id);

    if(!student) {
      return res.status(404).json({
        status: 404,
        message: `get student by id ${id} not found `,
      });
    }

    res.json({
      status: 200,
      message: `get student by id ${id} `,
      data: student
        });
  };
