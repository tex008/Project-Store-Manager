const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [result] = await connection.query('SELECT * FROM StoreManager.products;');
    return result;
  },

  getById: async (id) => {
    const [result] = await connection
      .query('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
    return result;
  },
  
  create: async (name) => {
    const [result] = await connection
      .query('INSERT INTO StoreManager.products (name) VALUES (?);',
      [name]);
    const newProduct = {
      id: result.insertId,
      name,
    };
    return newProduct;
  },
};

module.exports = productsModel;