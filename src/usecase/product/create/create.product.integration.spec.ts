import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';

describe('Test create product use case', () => {
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

  it('should create a product', async () => {
    const productRepository = new ProductRepository();

    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      id: '123',
      name: 'Product Test',
      price: 10.5,
    };

    const output = {
      id: '123',
      name: 'Product Test',
      price: 10.5,
    };

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
