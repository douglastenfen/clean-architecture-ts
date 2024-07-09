import CreateCustomerUseCase from './create.customer.usecase';

const input = {
  name: 'John Doe',
  address: {
    street: 'street test',
    number: 123,
    zipCode: '12345-123',
    city: 'city test',
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit Test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Street is required'
    );
  });
});
