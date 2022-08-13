const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');

describe('insert a new product in db', () => {
  describe('when the product is valid and was registred in db', () => {
    before(() => {
      const stuntmanResult = [{ affectedRows: 1, insertId: 1 }, undefined];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an object', async () => {
      const result = await productsModel.create({ name: 'tex008' });
      console.log('resultado do teste', result);
      expect(result).to.be.an('object')
    });
    it('should the object have the properties "id" and "name"', async () => {
      const result = await productsModel.create({ name: 'tex008' });
      console.log('resultado do teste',result);
      expect(result).to.include.all.keys('id', 'name');
    });
  });

})