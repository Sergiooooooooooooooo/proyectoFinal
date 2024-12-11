import Joi from 'joi';

export const categoriasValidationSchema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.min': 'El nombre debe tener al menos 3 caracteres.'
    })
});
