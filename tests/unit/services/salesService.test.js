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


// describe('sales Service create - insert a new product in db', () => {
//   describe('when the products are valid and were registred in db, so its possible to create a sale', () => {
//     before(() => {
//       sinon.stub(salesModel, 'getAll').resolves({ id: 1, name: 'Bilubiluteteia do batman' }, { id: 2, name: 'Traje de encolhimento' });
//       sinon.stub(salesModel, 'create').resolves(4);
//       sinon.stub(salesProductModel, 'getNewSale').resolves([{ productId: 2, quantity: 1 }]);
//     });
//     after(() => {
//       salesModel.getAll.restore();
//       salesModel.create.restore();
//       salesProductModel.getNewSale.restore();
//     });
//     it.only('should return an object', async () => {
//       const result = await salesService.create([{ productId: 2, quantity: 1 }]);
//       expect(result).to.be.an('object')
//     });
//   //   it('should the object have the properties "id" and "name"', async () => {
//   //     const result = await productsService.create({ name: 'tex008' });
//   //     expect(result).to.include.all.keys('id', 'name');
//   //   });
//   });

// })