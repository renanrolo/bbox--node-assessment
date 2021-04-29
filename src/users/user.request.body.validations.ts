import { Joi } from 'express-validation';

export default {

    createUser: {
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
}