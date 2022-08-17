const productSchema = require('../schemas/newProductSchema');

const isProductValid = (product) => {
  const isDataValid = productSchema.validate(product);

  return isDataValid;
};

module.exports = isProductValid;
