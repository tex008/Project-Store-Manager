const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesProductModel = require('../../../models/sales_product.model');

describe('Salesproducts Model createSaleProduct - insert a new sale with product id and product quantity in db', () => {
  describe('when the product is valid, and a sale with the product info can be created', () => {
    before(() => {
      const stuntmanResult = [{ affectedRows: 1 }, undefined];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an object', async () => {
      const result = await salesProductModel.createSaleProduct([{ productId: 2, quantity: 1 }], 1);
      expect(result).to.be.equal(1);
    });
  });

});

describe('Salesproducts Model getNewSale - search for the product id and product quantity based on a sale id', () => {
  describe('when there are a valid sale in db, and return the product id and quantity of this sale', () => {
    before(() => {
      const stuntmanResult = [{ productId: 2, quantity: 1 }];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an object', async () => {
      const result = await salesProductModel.getNewSale(1);
      expect(result).to.be.an('object');
    });
    it('should the objects have the properties "productId" and "quantity"', async () => {
      const result = await salesProductModel.getNewSale(1);
      expect(result).to.include.all.keys('productId', 'quantity');
    });
  });

});

describe('salesProducts Model updateSale - update a quantity of a product in a sale registred in db', () => {
  describe('when the product and sale exists and its quantity is updated', () => {
    before(() => {
      const stuntmanResult = [{ affectedRows: 1 }, undefined];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an object', async () => {
      const result = await salesProductModel.updateSale(1, [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]);
      expect(result).to.be.an('object')
    });
    it('should the object have the property "affectedRows"', async () => {
      const result = await salesProductModel.updateSale(1, [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]);
      expect(result).to.include.all.keys('affectedRows');
    });
  });

});