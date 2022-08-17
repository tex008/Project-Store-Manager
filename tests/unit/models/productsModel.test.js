const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');

describe('products model getAll - search for all products in db', () => {
  describe('when the are products registred in db', () => {
    before(() => {
      const stuntmanResult = [[{ id: 1, name: "tex" }], []];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });
    it('should the array not be empty', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.be.not.empty;
    });
    it('should the array contain objects', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not products registred in db', () => {
    before(() => {
      const stuntmanResult = [[], []];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    })
    it('should the array be empty', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.empty;
    })
  })

})

describe('products model getById - search for one product in db by id', () => {
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
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not a product with the id searched registred in db', () => {
    before(() => {
      const stuntmanResult = [[], []];
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
      const result = await productsModel.getById(13);
      expect(result).to.be.empty;
    })
  })

})

describe('products Model create - insert a new product in db', () => {
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
      expect(result).to.be.an('object')
    });
    it('should the object have the properties "id" and "name"', async () => {
      const result = await productsModel.create({ name: 'tex008' });
      expect(result).to.include.all.keys('id', 'name');
    });
  });

})

describe('products Model update - update a name of a product in db', () => {
  describe('when the product exist and is updated', () => {
    before(() => {
      const stuntmanResult = [{ affectedRows: 1 }, undefined];
      sinon.stub(connection, 'query').resolves(stuntmanResult);
    });
    after(() => {
      connection.query.restore();
    });

    it('should return an object', async () => {
      const result = await productsModel.update({ name: 'tex008' });
      expect(result).to.be.an('object')
    });
    it('should the object have the property "affectedRows"', async () => {
      const result = await productsModel.update({ name: 'tex008' });
      expect(result).to.include.all.keys('affectedRows');
    });
  });

})