const { Router } = require('express');
const { validateNewProductBody } = require('../middlewares/validateDataMiddleware');
const productsController = require('../controllers/products.controller');

const route = Router();
route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/', validateNewProductBody, productsController.create);
route.put('/:id', validateNewProductBody, productsController.update);

module.exports = route;