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

//


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

describe('sales Controller create - insert a new sale in db', () => {
  describe('when the product is valid and was registred in db, so the sale can be created successfully', () => {
    const req = {};
    const res = {};
    before(() => {
      req.body = [{ productId: 2, quantity: 1 }];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'create').resolves({ id: 4, itemsSold: [{ productId: 2, quantity: 1 }] });
    });
    after(() => {
      salesService.create.restore();
    });

    it('should return a status 201', async () => {
      await salesController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
    it('should return the new sale registred to the client', async () => {
      await salesController.create(req, res);
      expect(res.json.calledWith({ id: 4, itemsSold: [{ productId: 2, quantity: 1 }] })).to.be.equal(true);
    });
  });

})