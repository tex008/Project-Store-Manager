const salesModel = require('../models/sales.model');
const NotFoundError = require('../errors/NotFoundError');
const productsModel = require('../models/products.model');
const validateIdProducts = require('../helpers/validateDbProducts');
const salesProductsModel = require('../models/sales_product.model');
const salesProductModel = require('../models/sales_product.model');

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
  
  create: async (arrayOfProducts) => {
    const newSaleProductIds = arrayOfProducts.map((product) => product.productId);
    const allDbProducts = await productsModel.getAll();
    await validateIdProducts(allDbProducts, newSaleProductIds);
    const newSaleId = await salesModel.create();
    await salesProductsModel
      .createSaleProduct(arrayOfProducts, newSaleId);
    const getNewSale = await salesProductsModel.getNewSale(newSaleId);
    const newSale = {
      id: newSaleId,
      itemsSold: getNewSale,
    };
    return newSale;
  },

  delete: async (id) => {
    const { affectedRows } = await salesModel.delete(id);
    if (affectedRows === 0) throw new NotFoundError('Sale not found');
    return affectedRows;
  },

  update: async (saleId, arrayOfProducts) => {
    const ProductIdsToUpate = arrayOfProducts.map((product) => product.productId);
    const allDbProducts = await productsModel.getAll();
    await validateIdProducts(allDbProducts, ProductIdsToUpate);
    const sale = await salesProductModel.getNewSale(saleId);
    if (!sale.length) throw new NotFoundError('Sale not found');
    await salesProductModel.updateSale(saleId, arrayOfProducts);
    const getUpdatedSale = await salesProductsModel.getNewSale(saleId);
    const updatedSale = {
      saleId,
      itemsUpdated: getUpdatedSale,
    };
    console.log(updatedSale);
    return updatedSale;
  },
}; 

module.exports = salesService;