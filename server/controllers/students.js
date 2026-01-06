import mongoose from 'mongoose';
import { createStudent, deleteStudent, getAllStudents, getStudentById, upsertStudent,  } from '../src/services/students.js';
import { parsePaginationParams } from '../src/utils/parsePaginationParams.js';


export const getAllStudentsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);

    const students = await getAllStudents({ page, perPage });

    res.json({
      status: 200,
      message: 'get all students',
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentByIdController = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid student id',
      });
    }

    const student = await getStudentById(studentId);
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: 'Student not found',
      });
    }

    res.json({
      status: 200,
      message: `get student by id ${studentId}`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudentController = async (req, res, next) => {
  const { body } = req;

  const student = await createStudent(body);

  res.status(201).json({
    status: 201,
    message: 'Create new student',
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) {
    return res.status(404).json({
      status: 404,
      message: 'Student not found',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Student removed',
    data: student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const { body } = req;

  // ✅ Проверка на валидный ObjectId
  if (!mongoose.isValidObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid student id',
    });
  }

  const student = await upsertStudent(studentId, body);

  if (!student) {
    return res.status(404).json({
      status: 404,
      message: 'Student not found',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Student updated',
    data: student,
  });
};

export const putStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const { body } = req;

  if (!mongoose.isValidObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid student id',
    });
  }

  const student = await upsertStudent(studentId, body, { upsert: true });

  res.status(200).json({
    status: 200,
    message: 'Student updated or created',
    data: student,
  });
};
