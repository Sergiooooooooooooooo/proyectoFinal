import Joi from 'joi';

export const ordenesValidationSchemaU = Joi.object({
    nombre: Joi.string().min(3).optional(),
    documento: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),       
    apellido: Joi.string().min(3).optional(),
    direccion: Joi.string().min(5).optional(),
    telefono: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    confirmacionManga: Joi.string().min(1).optional(),
});
