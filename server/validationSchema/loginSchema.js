import Joi from 'joi';

export const loginSchema = Joi.object({
  password: Joi.string().min(1).max(120),
  email: Joi.string().required().email(),
});
