import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';
import Product from '../../../domain/product/entity/product';

describe('Test update product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();

    const useCase = new UpdateProductUseCase(productRepository);

    const product = new Product('123', 'Product Test', 10.5);

    await productRepository.create(product);

    product.changeName('Product Test Updated');
    product.changePrice(20.5);

    await useCase.execute(product);

    const updatedProduct = await productRepository.findById('123');

    expect(updatedProduct.name).toBe('Product Test Updated');
    expect(updatedProduct.price).toBe(20.5);
  });
});
