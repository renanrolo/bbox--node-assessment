import express from "express";
import { validate } from 'express-validation';
import validations from './project.request.body.validations';

const router = express.Router();
const controller = require('./projects.controller');

router.post('/', validate(validations.createProject), controller.post);
router.get('/:projectId', controller.getOne);
router.get('/', controller.getAll);
router.delete('/:projectId', controller.delete);

module.exports = router;