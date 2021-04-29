import { Joi } from 'express-validation';

export default {

    createProject: {
        body: Joi.object({
            userId: Joi
                .string()
                .required(),
            description: Joi
                .string()
                .required(),
        })
    }
}