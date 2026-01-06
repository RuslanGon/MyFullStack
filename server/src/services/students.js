import { Student } from '../db/models/student.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;
  const order = sortOrder === 'desc' ? -1 : 1;

  const [students, total] = await Promise.all([
    Student.find()
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(perPage),

    Student.countDocuments(),
  ]);

  return {
    students,
    meta: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
};


// export const getAllStudents = async () => {
//   return await Student.find();
// };

export const getStudentById = async (id) => {
  return await Student.findById(id);
};

export const createStudent = async (payload) => {
  return await Student.create(payload);
};

export const deleteStudent = async (id) => {
  return Student.findByIdAndDelete(id);
};


export const upsertStudent = async (id, payload, options = {}) => {
  const student = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    upsert: true,
    ...options
  });

  return student;
};
