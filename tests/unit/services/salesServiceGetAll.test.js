const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/sales.service');
const salesModel = require('../../../models/sales.model');

describe('sales Service getAll - search for all sales in db', () => {
  describe('when the are sales registred in db', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([
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
      salesModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });
    it('should the array not be empty', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.not.empty;
    });
    it('should the array contain objects', async () => {
      const result = await salesService.getAll();
      expect(result[0], result[1]).to.be.an('object');
    });
    it('should the objects have the properties "saleId", "date", "productId" and "quantity"', async () => {  
      const result = await salesService.getAll();
      expect(result[0], result[1]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('when there are not sales registred in db', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([]);
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    })
    it('should the array be empty', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.empty;

    })
  })

})