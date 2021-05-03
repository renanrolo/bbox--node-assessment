import express from 'express';
import ProjectsController from '../controllers/projects-controller';
import { validate } from 'express-validation';
import { validateProject } from '../validations/validate-project';

const router = express.Router();

router.get('/users/:userId/projects/:projectId', ProjectsController.find);
router.get('/users/:userId/projects', ProjectsController.list);
router.post('/users/:userId/projects', validate(validateProject), ProjectsController.create);
router.put('/users/:userId/projects/:projectId', validate(validateProject), ProjectsController.edit);
router.delete('/users/:userId/projects/:projectId', ProjectsController.remove);

export = router;