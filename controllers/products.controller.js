const productsService = require('../services/products.service');

const productsController = {
  getAll: async (_req, res) => {
    const data = await productsService.getAll();
    return res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const result = await productsService.getById(id);
    return res.status(200).json(result);
  },

  create: async (req, res) => {
    const { name } = req.body;
    const newProduct = await productsService.create(name);
    return res.status(201).json(newProduct);
  },

  update: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    await productsService.update(name, id);
    return res.status(200).json({ id, name });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await productsService.delete(id);
    res.status(204).end();
  },

  getByQueryString: async (req, res) => {
    const { q } = req.query;
    const findProductByQuery = await productsService.getByQueryString(q);
    res.status(200).json(findProductByQuery);
  },
};

module.exports = productsController;