import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';

export const getAllStudents = async () => {
  return await Student.find();
};

export const getStudentById = async (id) => {
  return await Student.findById(id);
};

export const createStudent = async (payload) => {
  return await Student.create(payload);
};

export const deleteStudent = async (id) => {
  return Student.findByIdAndDelete(id);
};


export const patchStudent = async (id, payload) => {
  const student = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  return student;
};
