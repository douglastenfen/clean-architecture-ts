import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();

    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('123', 'John Doe');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.changeAddress(address);

    await customerRepository.create(customer);

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
});
