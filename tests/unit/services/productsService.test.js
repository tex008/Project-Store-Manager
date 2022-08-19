const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const productsService = require('../../../services/products.service');
const productsModel = require('../../../models/products.model');
const NotFoundError = require('../../../errors/NotFoundError');

describe('products Service getAll - search for all products in db', () => {
  describe('when the are products registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1, name: 'tex' }]);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });
    it('should the array not be empty', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.not.empty;
    });
    it('should the array contain objects', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not products registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([]);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    })
    it('should the array be empty', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.empty;

    })
  })

});

describe('products Service getById - search for one product in db by id', () => {
  describe('when there are a product with the id searched registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'tex' }]);
    });
    after(() => {
      productsModel.getById.restore();
    });
    it('should return an object', async () => {
      const result = await productsService.getById(1);
      expect(result).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsService.getById(1);
      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('when there are not a product with the id searched registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([]);
    });
    after(() => {
      productsModel.getById.restore();
    });
    it('should throw a custom error', () => {
      return expect(productsService.getById(13)).to.eventually.be.rejectedWith('Product not found').and.be.an.instanceOf(NotFoundError);
    })
  });

})


describe('products Service create - insert a new product in db', () => {
  describe('when the product is valid and was registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'create').resolves({ id: 1, name: 'tex' });
    });
    after(() => {
      productsModel.create.restore();
    });
    it('should return an object', async () => {
      const result = await productsService.create({ name: 'tex008' });
      expect(result).to.be.an('object')
    });
    it('should the object have the properties "id" and "name"', async () => {
      const result = await productsService.create({ name: 'tex008' });
      expect(result).to.include.all.keys('id', 'name');
    });
  });

})

describe('products Service update - update a name of a product in db', () => {
  describe('when there are a product with the id searched registred in db, and the name is updated successfully', () => {
    before(() => {
      sinon.stub(productsModel, 'update').resolves({ affectedRows: 1 });
    });
    after(() => {
      productsModel.update.restore();
    });
    it('should return the affected rows', async () => {
      const result = await productsService.update('tex', 2);
      expect(result).to.be.equal(1);
    });
  });

  describe('when there are not a product with the id searched registred in db, therefore cannot be updated', () => {
      before(() => {
        sinon.stub(productsModel, 'update').resolves({affectedRows: 0});
      });
      after(() => {
        productsModel.update.restore();
      });
      it('should throw a custom error', () => {
        return expect(productsService.update('tex', 95)).to.eventually.be.rejectedWith('Product not found').and.be.an.instanceOf(NotFoundError);
      })
  });

});

describe('products Service delete - delete a name of a product in db', () => {
  describe('when there are a product with the id searched registred in db, and the name is deleted successfully', () => {
    before(() => {
      sinon.stub(productsModel, 'delete').resolves({ affectedRows: 1 });
    });
    after(() => {
      productsModel.delete.restore();
    });
    it('should return the affected rows', async () => {
      const result = await productsService.delete(2);
      expect(result).to.be.equal(1);
    });
  });

  describe('when there are not a product with the id searched registred in db, therefore cannot be deleted', () => {
    before(() => {
      sinon.stub(productsModel, 'delete').resolves({ affectedRows: 0 });
    });
    after(() => {
      productsModel.delete.restore();
    });
    it('should throw a custom error', () => {
      return expect(productsService.delete(95)).to.eventually.be.rejectedWith('Product not found').and.be.an.instanceOf(NotFoundError);
    })
  });

});


describe('products Service getByQueryString - search for products in db based on a search made by the user', () => {
  describe('when the search matches a product registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([
        { id: 1, name: 'Capa do Batman' },
        { id: 2, name: 'Capacete de Motoqueiro' },
        { id: 3, name: 'Galão da Massa' }
      ]);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('should return an array', async () => {
      const result = await productsService.getByQueryString('Capa');
      expect(result).to.be.an('array');
    });
    it('should the array not be empty', async () => {
      const result = await productsService.getByQueryString('Capa');
      expect(result).to.be.not.empty;
    });
    it('should the array contain objects', async () => {
      const result = await productsService.getByQueryString('Capa');
      expect(result[0], result[1]).to.be.an('object');
    });
    it('should the objects have the properties "id" and "name"', async () => {
      const result = await productsService.getByQueryString('Capa');
      expect(result[0], result[1]).to.include.all.keys('id', 'name');
    });
  });

  describe('when the search does not match with a product registred in db', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([]);
    });
    after(() => {
      productsModel.getAll.restore();
    });

      it('should return an array', async () => {
        const result = await productsService.getByQueryString('Martelo');
        expect(result).to.be.an('array');
      })
      it('should the array be empty', async () => {
        const result = await productsService.getByQueryString('Martelo');
        expect(result).to.be.empty;
      })
  });

});
