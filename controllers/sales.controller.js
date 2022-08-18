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
    const newSale = req.body;
    const newCreatedSale = await salesService.create(newSale);
    res.status(201).json(newCreatedSale);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await salesService.delete(id);
    res.status(204).end();
  },

  update: async (req, res) => {
    const { id } = req.params;
    const arrayofProducts = req.body;
    const updatedSale = await salesService.update(id, arrayofProducts);
    res.status(200).json(updatedSale);
  },
};

module.exports = salesController;