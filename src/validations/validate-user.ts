import { Joi } from 'express-validation';

const validateUser = {
    body: Joi.object({
        firstName: Joi
            .string()
            .required(),
        lastName: Joi
            .string()
            .required(),
        email: Joi
            .string()
            .email()
            .required(),
        phoneNumber: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .required(),
    })
}

export { validateUser }