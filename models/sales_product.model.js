const connection = require('./connection');

const salesProductModel = {
  createSaleProduct: async (arrayOfSales, saleId) => {
   await Promise.all(arrayOfSales.map((sale) => connection
      .query(`INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES (?,?,?)`, [saleId, sale.productId, sale.quantity])));
  },
  
  getNewSale: async (id) => {
    const [result] = await connection
      .query(`SELECT 
        product_id AS productId,
        quantity
      FROM StoreManager.sales_products WHERE sale_id = ?`, [id]);
    return result;
  },

};

module.exports = salesProductModel;
