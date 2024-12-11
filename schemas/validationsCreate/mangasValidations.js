import Joi from 'joi';

export const mangasValidationSchema = Joi.object({
    titulo: Joi.string().min(3).required().messages({
        'string.base': 'El título debe ser un texto.',
        'string.empty': 'El título no puede estar vacío.',
        'string.min': 'El título debe tener al menos 3 caracteres.'
    }),
    autor: Joi.string().min(3).required().messages({
        'string.base': 'El autor debe ser un texto.',
        'string.empty': 'El autor no puede estar vacío.',
        'string.min': 'El autor debe tener al menos 3 caracteres.'
    }),
    genero: Joi.string().min(3).required().messages({
        'string.base': 'El genero debe ser un texto.',
        'string.empty': 'El genero no puede estar vacío.',
        'string.min': 'El genero debe tener al menos 3 caracteres.'
    }),
    volumenes: Joi.number().integer().min(1).required().messages({
        'number.base': 'Los volúmenes deben ser un número entero.',
        'number.min': 'El número de volúmenes debe ser al menos 1.'
    }),
    fechaPublicacion: Joi.date().required().messages({
        'date.base': 'La fecha de publicación debe ser una fecha válida.'
    }),
    sinopsis: Joi.string().min(10).required().messages({
        'string.base': 'La sinopsis debe ser un texto.',
        'string.empty': 'La sinopsis no puede estar vacía.',
        'string.min': 'La sinopsis debe tener al menos 10 caracteres.'
    }),
    calificacion: Joi.number().min(0).max(10).required().messages({
        'number.base': 'La calificación debe ser un número.',
        'number.min': 'La calificación debe ser al menos 0.',
        'number.max': 'La calificación debe ser como máximo 10.'
    }),
    editorial: Joi.string().min(3).required().messages({
        'string.base': 'La editorial debe ser un texto.',
        'string.empty': 'La editorial no puede estar vacía.',
        'string.min': 'La editorial debe tener al menos 3 caracteres.'
    }),

    precio: Joi.number().positive().precision(2).required(),

    imagen: Joi.string().optional().messages({
        'string.base': 'La imagen debe ser un texto.'
    })
});
