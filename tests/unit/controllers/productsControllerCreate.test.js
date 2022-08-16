const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('products Controller create - insert a new product in db', () => {
  describe('when the product is valid and was registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      req.body = { name: 'tex1' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'create').resolves({ id: 1, name: 'tex1' });
    });
    after(() => {
      productsService.create.restore();
    });

    it('should return a status 201', async () => {
      await productsController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
    it('should return the new product registred to the client', async () => {
      await productsController.create(req, res);
      expect(res.json.calledWith({ id: 1, name: 'tex1' })).to.be.equal(true);
    });
  });

})