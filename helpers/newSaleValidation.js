const newSaleSchema = require('../schemas/newSaleSchema');

const isSaleValid = (sale) => {
  const isDataValid = newSaleSchema.validate(sale);

  return isDataValid;
};

module.exports = isSaleValid;