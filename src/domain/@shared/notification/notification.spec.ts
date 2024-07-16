import { Notification } from './notification';

describe('Unit test for Notification', () => {
  it('should create errors', () => {
    const notification = new Notification();

    const customerError = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(customerError);

    expect(notification.messages('customer')).toBe('customer: error message');

    const customerError2 = {
      message: 'error message 2',
      context: 'customer',
    };

    notification.addError(customerError2);

    expect(notification.messages('customer')).toBe(
      'customer: error message, customer: error message 2'
    );

    const productError = {
      message: 'error message',
      context: 'product',
    };

    notification.addError(productError);

    const productError2 = {
      message: 'error message 2',
      context: 'product',
    };

    notification.addError(productError2);

    expect(notification.messages('customer')).toBe(
      'customer: error message, customer: error message 2'
    );

    expect(notification.messages('product')).toBe(
      'product: error message, product: error message 2'
    );

    expect(notification.messages()).toBe(
      'customer: error message, customer: error message 2, product: error message, product: error message 2'
    );
  });

  it('check if there is at least one error', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all errors props', () => {
    const notification = new Notification();

    const customerError = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(customerError);

    const productError = {
      message: 'error message',
      context: 'product',
    };

    notification.addError(productError);

    expect(notification.getErrors()).toEqual([customerError, productError]);
  });
});
