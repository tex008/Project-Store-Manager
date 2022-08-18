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

  update: async (name, id) => {
    const { affectedRows } = await productsModel.update(name, id);
    if (affectedRows === 0) throw new NotFoundError('Product not found');
    return affectedRows;
  },

  delete: async (id) => {
    const { affectedRows } = await productsModel.delete(id);
    if (affectedRows === 0) throw new NotFoundError('Product not found');
    return affectedRows;
  },

  getByQueryString: async (q) => {
    const products = await productsModel.getAll();
    const findName = products.filter((product) => product.name.includes(q));
    return findName;
  },
};

module.exports = productsService;