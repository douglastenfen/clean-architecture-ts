import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer('123', 'John Doe');
const address = new Address('street test', 123, '12345-123', 'city test');

customer.changeAddress(address);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: '123' };

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'street test',
        city: 'city test',
        number: 123,
        zipCode: '12345-123',
      },
    };

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it('should not found a customer', async () => {
    const customerRepository = MockRepository();

    customerRepository.findById.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: '123' };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
