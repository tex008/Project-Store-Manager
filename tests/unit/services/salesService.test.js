const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


const salesService = require('../../../services/sales.service');
const salesModel = require('../../../models/sales.model');
const NotFoundError = require('../../../errors/NotFoundError');
const salesProductModel = require('../../../models/sales_product.model');
const productsModel = require('../../../models/products.model');

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
      return expect(salesService.getById(13)).to.eventually.be.rejectedWith('Sale not found').and.be.an.instanceOf(NotFoundError);
    })
  });

})


describe('sales Service create - create a new sale in db', () => {
  describe('when the products are valid and were registred in db, so its possible to create a sale', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1, name: 'Bilubiluteteia do batman' }, { id: 2, name: 'Traje de encolhimento' }]);
      sinon.stub(salesModel, 'create').resolves(4);
      sinon.stub(salesProductModel, 'createSaleProduct').resolves(1);
      sinon.stub(salesProductModel, 'getNewSale').resolves([{ productId: 2, quantity: 1 }]);
    });
    after(() => {
      productsModel.getAll.restore();
      salesModel.create.restore();
      salesProductModel.createSaleProduct.restore();
      salesProductModel.getNewSale.restore();
    });
    it('should return an object', async () => {
      const result = await salesService.create([{ productId: 2, quantity: 1 }]);
      expect(result).to.be.an('object')
    });
    it('should the object have the properties "id" and "itemsSold"', async () => {
      const result = await salesService.create([{ productId: 2, quantity: 1 }]);
      expect(result).to.include.all.keys('id', 'itemsSold');
    });
  });

});

describe('sales Service delete - delete a sale in db', () => {
  describe('when there are a sale with the id searched registred in db, and the name is deleted successfully', () => {
    before(() => {
      sinon.stub(salesModel, 'delete').resolves({ affectedRows: 1 });
    });
    after(() => {
      salesModel.delete.restore();
    });
    it('should return the affected rows', async () => {
      const result = await salesService.delete(2);
      expect(result).to.be.equal(1);
    });
  });

  describe('when there are not a sale with the id searched registred in db, therefore cannot be deleted', () => {
    before(() => {
      sinon.stub(salesModel, 'delete').resolves({ affectedRows: 0 });
    });
    after(() => {
      salesModel.delete.restore();
    });
    it('should throw a custom error', () => {
      return expect(salesService.delete(95)).to.eventually.be.rejectedWith('Sale not found').and.be.an.instanceOf(NotFoundError);
    })
  });

});

describe('sales Service update - update a existent sale in db', () => {
  describe('when the productsId are valid and were registred in db, so its possible to update a sale', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1, name: 'Bilubiluteteia do batman' }, { id: 2, name: 'Traje de encolhimento' }]);
      sinon.stub(salesProductModel, 'getNewSale').onCall(0).resolves([{ productId: 1, quantity: 5 }, { productId: 2, quantity: 10 }]).onCall(1).resolves([{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }]);
      sinon.stub(salesProductModel, 'updateSale').resolves(1);
    });
    after(() => {
      productsModel.getAll.restore();
      salesProductModel.getNewSale.restore();
      salesProductModel.updateSale.restore();
    });
    it('should return an object of products', async () => {
      const result = await salesService.update(1,[{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }]);
      expect(result).to.be.an('object')
    });
  });

  describe('when the productsId are not valid or the sale its not valid, so its impossible to update a sale', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1, name: 'Bilubiluteteia do batman' }, { id: 2, name: 'Traje de encolhimento' }]);
      sinon.stub(salesProductModel, 'getNewSale').resolves([]);
    });
    after(() => {
      productsModel.getAll.restore();
      salesProductModel.getNewSale.restore();
    });
    it('should return an empty array of products', async () => {
      const result = await salesProductModel.getNewSale(13);
      expect(result).to.be.an('array')
    });
    it('should throw a custom error', () => {
      return expect(salesService.update(13, [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }])).to.eventually.be.rejectedWith('Sale not found').and.be.an.instanceOf(NotFoundError);
    })
  });

});
