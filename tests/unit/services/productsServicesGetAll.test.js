const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/products.service');
const productsModel = require('../../../models/products.model');

describe('search for all products in db', () => {
  describe('when the are products registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1, name: 'tex' }]);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });
    it('should the array not be empty', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.not.empty;
    });
    it('should the array contain objects', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not products registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([]);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    })
    it('should the array be empty', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.empty;

    })
  })

})