const salesService = require('../services/sales.service');

const salesController = {
  getAll: async (_req, res) => {
    const data = await salesService.getAll();
    return res.status(200).json(data);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getById(id);
    return res.status(200).json(result);
  },
  create: async (req, res) => {
    const sales = req.body;
    const newSale = await salesService.create(sales);
    return res.status(201).json(newSale);
  },
};

module.exports = salesController;