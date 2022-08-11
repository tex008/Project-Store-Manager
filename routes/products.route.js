const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const route = Router();

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);

module.exports = route;