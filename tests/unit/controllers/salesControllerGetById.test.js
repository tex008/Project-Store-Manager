const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');

describe('sales Controller getById - search for one sale in db by id', () => {
  describe('when there are a sale with the id searched registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([
        {
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 2,
          "quantity": 10
        }
      ]);
    });
    after(() => {
      salesService.getById.restore();
    });

    it('should return a status 200', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('should return the object to the client', async () => {
      await salesController.getById(req, res);
      expect(res.json.calledWith([
        {
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 2,
          "quantity": 10
        }
      ])).to.be.equal(true);
    });
  });
})
