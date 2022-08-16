const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('products Controller getAll - search for all products in db', () => {
  describe('when the are products registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([
        { id: 1, name: 'tex1' },
        { id: 2, name: 'tex2' }
      ]);
    });
    after(() => {
      productsService.getAll.restore();
    });

    it('should return a status 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('should return the array to the client', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith([
        { id: 1, name: 'tex1' },
        { id: 2, name: 'tex2' }]
      )).to.be.equal(true);
    });
  });

  describe('when there are not products registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([]);
    });
    after(() => {
      productsService.getAll.restore();
    });

    it('should return a status 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('should return the array to the client', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    });
  })
})
