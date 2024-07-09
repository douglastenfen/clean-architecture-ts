import CreateProductUseCase from './create.product.usecase';

const input = {
  id: '123',
  name: 'Product Test',
  price: 10.5,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit Test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it('should throw an error when creating a product with an invalid name', async () => {
    const productRepository = MockRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...input, name: '' })
    ).rejects.toThrow('Name is required');
  });

  it('should throw an error when creating a product with an invalid price', async () => {
    const productRepository = MockRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...input, price: -1 })
    ).rejects.toThrow('Price must be greater than zero');
  });
});
