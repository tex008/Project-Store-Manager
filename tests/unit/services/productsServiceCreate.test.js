const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/products.service');
const productsModel = require('../../../models/products.model');

describe('products Service create - insert a new product in db', () => {
  describe('when the product is valid and was registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'create').resolves({ id: 1, name: 'tex' });
    });
    after(() => {
      productsModel.create.restore();
    });
    it('should return an object', async () => {
      const result = await productsService.create({ name: 'tex008' });
      expect(result).to.be.an('object')
    });
    it('should the object have the properties "id" and "name"', async () => {
      const result = await productsService.create({ name: 'tex008' });
      expect(result).to.include.all.keys('id', 'name');
    });
  });

})