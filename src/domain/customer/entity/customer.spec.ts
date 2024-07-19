import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when ID is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrow(
      'customer: ID is required'
    );
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrow('customer: Name is required');
  });

  it('should throw error when ID and name are empty', () => {
    expect(() => new Customer('', '')).toThrow(
      'customer: ID is required, customer: Name is required'
    );
  });

  it('should change name', () => {
    const customer = new Customer('1', 'John Doe');

    customer.changeName('Jane Doe');

    expect(customer.name).toBe('Jane Doe');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main St.', 123, '12345-123', 'Anytown');

    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John Doe');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when activating customer without address', () => {
    const customer = new Customer('1', 'John Doe');

    expect(() => customer.activate()).toThrow(
      'Address is mandatory to activate a customer'
    );
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
