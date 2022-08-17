const BadRequestError = require('../errors/BadRequestError');
const UnprocessableError = require('../errors/UnprocessableError');
const isProductValid = require('../helpers/newProductValidation');
const isSaleValid = require('../helpers/newSaleValidation');

const validateData = {
  validateNewProductBody: (req, _res, next) => {
    const { error } = isProductValid(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      switch (code) {
        case '400':
          throw new BadRequestError(message); 
        case '422':
          throw new UnprocessableError(message); 
        default:
          break;
      }
    }

  next();
  },
};

const validateNewSaleBody = (req, _res, next) => {
  const { error } = isSaleValid(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    switch (code) {
      case '400':
        throw new BadRequestError(message);
      case '422':
        throw new UnprocessableError(message);
      default:
        break;
    }
  }

  next();
};

module.exports = {
  validateData,
  validateNewSaleBody,
};