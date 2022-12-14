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
  create: async () => {
    const [{ insertId }] = await connection
      .query('INSERT INTO StoreManager.sales (date) VALUES (DEFAULT);');
    const newSale = insertId;
    return newSale;
  },
  delete: async (id) => {
    const [result] = await connection.query('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
    return result;
  },
};

module.exports = salesModel;