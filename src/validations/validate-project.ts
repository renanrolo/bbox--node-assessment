import { Joi } from 'express-validation';

const validateProject = {
    body: Joi.object({
        description: Joi
            .string()
            .required(),
    })
}

export { validateProject }