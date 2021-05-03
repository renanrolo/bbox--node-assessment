import express from 'express';
import UsersController from './users-controller';
import { validate } from 'express-validation';
import { validateUser } from '../validations/validate-user';

const router = express.Router();

router.get('/users/:userId', UsersController.find);
router.get('/users/', UsersController.list);
router.post('/users/', validate(validateUser), UsersController.create);
router.put('/users/:userId', validate(validateUser), UsersController.edit);
router.patch('/users/:userId', UsersController.edit);
router.delete('/users/:userId', UsersController.remove);

export =  router;