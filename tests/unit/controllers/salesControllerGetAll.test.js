const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');
  
describe('products Service getAll - sales Controller getAll - search for all sales in db', () => {
  describe('when the are sales registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([
        {
          "saleId": 1,
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 2,
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 3,
          "quantity": 15
        }
      ]);
    });
    after(() => {
      salesService.getAll.restore();
    });

    it('should return a status 200', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('should return the sales array to the client', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith([
        {
          "saleId": 1,
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 2,
          "date": "2022-08-15T23:03:44.000Z",
          "productId": 3,
          "quantity": 15
        }]
      )).to.be.equal(true);
    });
  });

  describe('when there are not sales registred in db', () => {
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([]);
    });
    after(() => {
      salesService.getAll.restore();
    });

    it('should return a status 200', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('should return the empty sales array to the client', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    });
  })
})
