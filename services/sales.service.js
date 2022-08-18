const salesModel = require('../models/sales.model');
const NotFoundError = require('../errors/NotFoundError');
const productsModel = require('../models/products.model');
const validateIdProducts = require('../helpers/validateDbProducts');
const salesProductsModel = require('../models/sales_product.model');

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
  create: async (arrayOfSales) => {
    const newSaleProductIds = arrayOfSales.map((sale) => sale.productId);
    const allDbProducts = await productsModel.getAll();
    await validateIdProducts(allDbProducts, newSaleProductIds);
    const newSaleId = await salesModel.create();
    await salesProductsModel
    .createSaleProduct(arrayOfSales, newSaleId);
    const getNewSale = await salesProductsModel.getNewSale(newSaleId);
    const newSale = {
      id: newSaleId,
      itemsSold: getNewSale,
    };
    return newSale;
  },
  delete: async (id) => {
    const { affectedRows } = await salesModel.delete(id);
    console.log(affectedRows);
    if (affectedRows === 0) throw new NotFoundError('Sale not found');
    return affectedRows;
  },
}; 

module.exports = salesService;