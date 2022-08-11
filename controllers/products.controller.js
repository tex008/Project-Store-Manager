const productsService = require('../services/products.service');

const productsController = {
  getAll: async (req, res) => {
    const data = await productsService.getAll();
    return res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const result = await productsService.getById(id);
    return res.status(200).json(result);
  },
  
};

module.exports = productsController;