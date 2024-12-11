import Joi from 'joi';

export const usersValidationSchemaU = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    password: Joi.string().min(6).optional(),
});
