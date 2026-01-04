import Joi from 'joi';

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  age: Joi.number().integer().min(1).max(120),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(1).max(12),
  onDuty: Joi.boolean()
});
