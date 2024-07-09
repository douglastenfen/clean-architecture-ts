import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.create('123', 'Product Test', 10.5);

const input = {
  id: product.id,
  name: 'Product Test Updated',
  price: 20.5,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe('Unit test update product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
