import express from "express";

const router = express.Router();
const controller = require('./users.controller');

router.post('/',  controller.post);
router.get('/:id', controller.getOne);
router.get('/', controller.getAll);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;