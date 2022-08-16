const salesModel = require('../models/sales.model');
const NotFoundError = require('../errors/NotFoundError');

const salesService = {
  getAll: async () => {
    const data = await salesModel.getAll();
    return data;
  },
  getById: async (id) => {
    const result = await salesModel.getById(id);
    if (!result.length) throw new NotFoundError('Sale not found');
    return result;
  },
  create: async (_sales) => {
    const newSale = await salesModel.createSale();
    // validações?
    return newSale;
  },
}; 

module.exports = salesService;