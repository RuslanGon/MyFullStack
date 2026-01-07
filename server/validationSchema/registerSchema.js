import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(1).max(120),
  email: Joi.string().required().email(),
});
