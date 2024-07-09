import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product('123', 'Product Test', 10.5);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe('Find Product Unit Test', () => {
  it('should find product', async () => {
    const productRepository = MockRepository();

    const useCase = new FindProductUseCase(productRepository);

    const input = { id: '123' };

    const output = {
      id: '123',
      name: 'Product Test',
      price: 10.5,
    };

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
