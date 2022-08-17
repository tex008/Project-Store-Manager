const Joi = require('joi');

const newSaleSchema = Joi.array().items(Joi.object().keys({
  productId: Joi.number().integer().positive().required()
.messages({
    'any.required': '400|"productId" is required',
  }), 
  quantity: Joi.number().min(1).integer().required()
    .messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to 1',
  }),
}));
  
module.exports = newSaleSchema;
