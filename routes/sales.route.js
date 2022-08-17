const { Router } = require('express');
const { validateNewSaleBody } = require('../middlewares/validateDataMiddleware');

const salesController = require('../controllers/sales.controller');

const route = Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
route.post('/', validateNewSaleBody, salesController.create);

module.exports = route;