const productsModel = require('../models/products.model');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  getAll: async () => {
    const data = await productsModel.getAll();
    return data;
  },

  getById: async (id) => {
    const result = await productsModel.getById(id); 
    if (!result.length) throw new NotFoundError('Product not found');
    return result[0];
  },

  create: async (name) => {
    const newProduct = await productsModel.create(name);
    return newProduct;
  },
};

module.exports = productsService;