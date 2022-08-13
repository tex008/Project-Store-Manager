const BadRequestError = require('../errors/BadRequestError');
const UnprocessableError = require('../errors/UnprocessableError');
const isProductValid = require('../helpers/productValidation');

const validateData = {
  validateBody: (req, res, next) => {
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

module.exports = validateData;