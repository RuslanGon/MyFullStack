import Joi from 'joi';

export const createResetEmailSchema = Joi.object({
    email: Joi.string().required().email(),
});
