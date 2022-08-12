const productsModel = require('../models/products.model');
const NotFoundError = require('../errors/notFoundError');

const productsService = {
  getAll: async () => {
    const data = await productsModel.getAll();
    console.log(data);
    return data;
  },

  getById: async (id) => {
    const result = await productsModel.getById(id); 
    if (!result.length) throw new NotFoundError('Product not found');
    return result[0];
  },
};

module.exports = productsService;