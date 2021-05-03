import { ValidationError } from 'express-validation'
import { CustomException } from '../exceptions/custom-exception';

export default function (app) {

  app.use(function (err, req, res, next) {

    //Get errors from 'express-validation'
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }

    //Using CustomException to customize responses
    if (err.name === 'CustomException') {
      return res.status(err.status).json({
        status: err.status || 500,
        message: err.message,
      })
    }

    //Generate generic error message in case of errors
    if (err) {
      return res.status(err.status || 500).send({
        error: {
          status: err.status || 500,
          message: 'Internal Server Error',
        },
      });
    }

    return res.status(404).send({
      status: 404,
      error: 'Not found'
    });
  });

}

