const connection = require('./connection');

const salesModel = {
  getAll: async () => {
    const [result] = await connection
      .query(`
        SELECT 
          sp.sale_id AS saleId,
          s.date AS date,
          sp.product_id AS productId,
          sp.quantity 
        FROM StoreManager.sales AS s 
        INNER JOIN StoreManager.sales_products AS sp
        ON s.id = sp.sale_id;`);
    return result;
  },
  getById: async (id) => {
    const [result] = await connection.query(`
      SELECT 
        s.date AS date,
        sp.product_id AS productId,
        sp.quantity 
      FROM StoreManager.sales AS s 
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      WHERE s.id = ?;`, [id]);
    return result;
  },
  createSale: async () => {
    const [newSaleData] = await connection
      .query('INSERT INTO StoreManager.sales (date) VALUES (DEFAULT);');
    console.log(newSaleData);
    const newSale = {
      id: newSaleData.insertId,
    };
    return newSale;
  },
};

module.exports = salesModel;