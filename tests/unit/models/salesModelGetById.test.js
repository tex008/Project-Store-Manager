const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales.model');

describe('sales model getById - search for one sale in db by id', () => {
  describe('when there are a product with the id searched registred in db', () => {
    before(() => {
      const stuntmanResult = [[
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
      ],[]];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });
    it('should return an array of products', async () => {
      const result = await salesModel.getById(1);
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
        const stuntmanResult = [[], []];
        sinon.stub(connection, 'query').resolves(stuntmanResult);
      });
      after(() => {
        connection.query.restore();
      });

      it('should return an array', async () => {
        const result = await salesModel.getById(13);
        expect(result).to.be.an('array');
      })
      it('should the array be empty', async () => {
        const result = await salesModel.getById(13);
        expect(result).to.be.empty;
      })
  });

});