import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(1).max(120),
});
