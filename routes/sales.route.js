const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const route = Router();

route.post('/', salesController.create);
route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);

module.exports = route;