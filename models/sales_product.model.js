const connection = require('./connection');

const salesProductModel = {
  createSaleProduct: async (arrayofProducts, saleId) => {
   const [[data]] = await Promise.all(arrayofProducts.map((product) => connection
      .query(`INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES (?,?,?)`, [saleId, product.productId, product.quantity])));
    const { affectedRows } = data;
    return affectedRows;
  },
  
  getNewSale: async (id) => {
    const [result] = await connection
      .query(`SELECT 
        product_id AS productId,
        quantity
      FROM StoreManager.sales_products WHERE sale_id = ?`, [id]);
    return result;
  },

  updateSale: async (saleId, arrayofProducts) => {
    const result = await Promise.all(arrayofProducts.map((product) =>
      connection
      .query(`UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`, [product.quantity, saleId, product.productId])));
    return result;
  },

};

module.exports = salesProductModel;
