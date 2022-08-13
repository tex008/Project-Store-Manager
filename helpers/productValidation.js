const productSchema = require('../schemas/productSchema');

const isProductValid = (product) => {
  const isDataValid = productSchema.validate(product);

  return isDataValid;
};

module.exports = isProductValid;
