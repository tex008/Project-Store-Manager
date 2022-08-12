const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('search for all products in db', () => {
  describe('when the are products registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      req.params = sinon.stub().returns(res);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'tex1' });
    });
    after(() => {
      productsService.getById.restore();
    });

    it('should return a status 200', async () => {
      await productsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('should return the object to the client', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith({ id: 1, name: 'tex1' })).to.be.equal(true);
    });
  });
})
