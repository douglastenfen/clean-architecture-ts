import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('street test', 123, '12345-123', 'city test')
);

const input = {
  id: customer.id,
  name: 'John Doe Updated',
  address: {
    street: 'street test updated',
    number: 321,
    zip: '54321-321',
    city: 'city test updated',
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe('Unit test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
