const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/products.model');
const productsService = require('../../../services/products.service');

describe('search for one product in db by id', () => {
  describe('when there are a product with the id searched registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'tex' }]);
    });
    after(() => {
      productsModel.getById.restore();
    });
    it('should return an object', async () => {
      const result = await productsService.getById();
      expect(result).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsService.getById();
      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not a product with the id searched registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([[]]);
    });
    after(() => {
      productsModel.getById.restore();
    });

    it('should return an array', async () => {
      const result = await productsService.getById();
      expect(result).to.be.an('array');
    })
    it('should the array be empty', async () => {
      const result = await productsService.getById();
      expect(result).to.be.empty;
    })
    // it('should throw a custom error', async () => { 
    //   const result = await productsService.getById();
    //   expect(result).to.throws('Product not found');
    // })
  });

})