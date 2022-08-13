const chai = require('chai');
const  { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

const productsModel = require('../../../models/products.model');
const productsService = require('../../../services/products.service');

chai.use(chaiAsPromised);

describe('search for one product in db by id', () => {
  describe('when there are a product with the id searched registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'tex' }]);
    });
    after(() => {
      productsModel.getById.restore();
    });
    it('should return an object', async () => {
      const result = await productsService.getById(1);
      expect(result).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsService.getById(1);
      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not a product with the id searched registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([]);
    });
    after(() => {
      productsModel.getById.restore();
    });
    it('should throw a custom error', () => { 
      return expect(productsService.getById(13)).to.eventually.be.rejectedWith('Product not found');
    })
  });

})