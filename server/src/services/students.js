import { Student } from '../db/models/student.js';
import { fitchaFile } from '../utils/fitchaFile.js';
// import { saveFile } from '../utils/saveFile.js';
// import { saveToCloudinary } from '../utils/saveToCloudinary.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'asc',
  filters = {},
  all = false, // новый флаг
} = {}) => {
  const order = sortOrder === 'desc' ? -1 : 1;

  const query = {};

  if (filters.gender) {
    query.gender = filters.gender;
  }

  if (typeof filters.onDuty !== 'undefined') {
    query.onDuty = filters.onDuty === 'true';
  }

  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }

  let students;
  let total = await Student.countDocuments(query);

  if (all) {
    // возвращаем все студенты, игнорируя пагинацию
    students = await Student.find(query).sort({ [sortBy]: order });
    return {
      students,
      meta: {
        total,
      },
    };
  }

  // стандартная пагинация
  const skip = (page - 1) * perPage;

  students = await Student.find(query)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(perPage);

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

export const createStudent = async ({avatar, ...payload}) => {
  // const url = await saveFile(avatar);
  // const url = await saveToCloudinary(avatar);
  const url = await fitchaFile(avatar);

  return await Student.create({...payload, avatarUrl: url});
};

// export const createStudent = async (payload) => {
//   return await Student.create(payload);
// };

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
