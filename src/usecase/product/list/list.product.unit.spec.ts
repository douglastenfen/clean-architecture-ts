import ProductFactory from '../../../domain/product/factory/product.factory';
import ListProductUseCase from './list.product.usecase';

const product1 = ProductFactory.create('123', 'Product 1', 10);
const product2 = ProductFactory.create('321', 'Product 2', 20);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
  };
};

describe('Unit test list product use case', () => {
  it('should list products', async () => {
    const productRepository = MockRepository();

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
