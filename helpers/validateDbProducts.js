const NotFoundError = require('../errors/NotFoundError');

const validateIdProducts = (existentProducts, newSaleProducts) => {
  const productIdsInDB = existentProducts.map((product) => product.id);
  newSaleProducts.forEach((newProductid) => {
    if (!productIdsInDB.includes(newProductid)) {
      throw new NotFoundError('Product not found');
    }
  });
};

module.exports = validateIdProducts;