const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');

describe('search for one product in db by id', () => {
  describe('when there are a product with the id searched registred in db', () => {
    before(() => {
      const stuntmanResult = [{ id: 1, name: "tex" }];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });
    it('should return an object', async () => {
      const result = await productsModel.getById(1); 
      expect(result).to.be.an('object');
    });
    // it('should the array have just one product', async () => {
    //   const result = await productsModel.getById();
    //   expect(result).to.have.length(1);
    // });
    // it('should the array contain objects', async () => {
    //   const result = await productsModel.getById();
    //   expect(result[0]).to.be.an('object');
    // });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not a product with the id searched registred in db', () => {
    before(() => {
      const stuntmanResult = [[],[]];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an array', async () => {
      const result = await productsModel.getById(13);
      expect(result).to.be.an('array');
    })
    it('should the array be empty', async () => {
      const result = await productsModel.getById();
      expect(result).to.be.empty;
    })
  })

})