const { Router } = require('express');
const { validateNewProductBody } = require('../middlewares/validateDataMiddleware');
const productsController = require('../controllers/products.controller');

const route = Router();
route.get('/search', productsController.getByQueryString);
route.get('/:id', productsController.getById);
route.get('/', productsController.getAll);
route.put('/:id', validateNewProductBody, productsController.update);
route.delete('/:id', productsController.delete);
route.post('/', validateNewProductBody, productsController.create);

module.exports = route;