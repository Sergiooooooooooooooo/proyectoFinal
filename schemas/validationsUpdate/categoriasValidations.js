import Joi from 'joi';

export const categoriasValidationSchemaU = Joi.object({
    nombre: Joi.string().min(3).optional()
    });

