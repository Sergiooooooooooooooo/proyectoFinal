import Joi from 'joi';

export const usersValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.base': 'El nombre de usuario debe ser un texto.',
        'string.empty': 'El nombre de usuario no puede estar vacío.',
        'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
        'string.max': 'El nombre de usuario no puede tener más de 30 caracteres.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'La contraseña debe ser un texto.',
        'string.empty': 'La contraseña no puede estar vacía.',
        'string.min': 'La contraseña debe tener al menos 6 caracteres.'
    })
});
