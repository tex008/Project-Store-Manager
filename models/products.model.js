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

  getByListOfIds: async (idArray) => {
    console.log('array de ids', idArray);
    // lembrar que idArray já em um id, então na hora de passar  no array de binds, não é necessário []
    const [result] = await connection
      .query('SELECT * FROM StoreManager.products WHERE id = ?;', idArray);
    console.log('resultado da busca dos ids dos produtos', result);
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