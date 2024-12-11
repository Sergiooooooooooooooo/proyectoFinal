import Joi from 'joi';

export const ordenesValidationSchema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.min': 'El nombre debe tener al menos 3 caracteres.'
    }),
    documento: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        'string.base': 'El documento debe ser un texto.',
        'string.empty': 'El documento no puede estar vacío.',
        'string.length': 'La cédula debe tener exactamente 10 dígitos.',
        'string.pattern.base': 'La cédula solo puede contener números.'
    }),
    apellido: Joi.string().min(3).required().messages({
        'string.base': 'El apellido debe ser un texto.',
        'string.empty': 'El apellido no puede estar vacío.',
        'string.min': 'El apellido debe tener al menos 3 caracteres.'
    }),
    direccion: Joi.string().min(5).required().messages({
        'string.base': 'La dirección debe ser un texto.',
        'string.empty': 'La dirección no puede estar vacía.',
        'string.min': 'La dirección debe tener al menos 5 caracteres.'
    }),
    telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'El teléfono debe tener 10 dígitos numéricos.'
    }),
    confirmacionManga: Joi.string().min(1).optional().messages({
        'string.base': 'La confirmación de manga debe ser un texto.'
    })
});
