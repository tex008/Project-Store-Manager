const chai = require('chai');
const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

const salesModel = require('../../../models/sales.model');
const salesService = require('../../../services/sales.service');

chai.use(chaiAsPromised);

describe('sales Service getById - search for one sale in db by id', () => {
  describe('when there are a sale with the id searched registred in db', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves([
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
      salesModel.getById.restore();
    });
    it('should return an array', async () => {
      const result = await salesService.getById(1);
      expect(result).to.be.an('array');
    });
    it('should the array not be empty', async () => {
      const result = await salesModel.getById(1);
      expect(result).not.to.be.empty;
    })
    it('should the objects in the array have the properties "date", "productId" and "quantity"', async () => {
      const result = await salesModel.getById(1);
      expect(result[0], result[1]).to.include.all.keys('date', 'productId', 'quantity');
    });
  });

  describe('when there are not a sale with the id searched registred in db', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves([]);
    });
    after(() => {
     salesModel.getById.restore();
    });
    it('should throw a custom error', () => {
      return expect(salesService.getById(13)).to.eventually.be.rejectedWith('Sale not found');
    })
  });

})