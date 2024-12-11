import Joi from 'joi';

export const mangasValidationSchemaU = Joi.object({
    titulo: Joi.string().min(3).optional(),
    autor: Joi.string().min(3).optional(),
    genero: Joi.string().min(3).optional(),
    volumenes: Joi.number().integer().min(1).optional(),
    fechaPublicacion: Joi.date().optional(),
    sinopsis: Joi.string().min(10).optional(),
    editorial: Joi.string().min(3).optional(),
    calificacion: Joi.number().min(0).max(10).optional(),
    precio: Joi.number().positive().precision(2).optional(),
    imagen: Joi.string().optional(),
});
