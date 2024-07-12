import request from 'supertest';
import { app, sequelize } from '../express';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          city: 'New York',
          street: 'Wall Street',
          number: 123,
          zipCode: '12345',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'John Doe',
      address: {
        city: 'New York',
        street: 'Wall Street',
        number: 123,
        zipCode: '12345',
      },
    });
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(500);
  });

  it('should get all customers', async () => {
    const responseCustomer1 = await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          street: 'Wall Street',
          city: 'New York',
          number: 123,
          zipCode: '12345',
        },
      });
    expect(responseCustomer1.status).toBe(200);

    const responseCustomer2 = await request(app)
      .post('/customers')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Wall Street',
          city: 'New York',
          number: 122,
          zipCode: '12345',
        },
      });
    expect(responseCustomer2.status).toBe(200);

    const listResponse = await request(app).get('/customers').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers).toHaveLength(2);

    const [customer1, customer2] = listResponse.body.customers;

    expect(customer1).toMatchObject({
      name: 'John Doe',
      address: {
        city: 'New York',
        street: 'Wall Street',
        number: 123,
        zip: '12345',
      },
    });

    expect(customer2).toMatchObject({
      name: 'Jane Doe',
      address: {
        city: 'New York',
        street: 'Wall Street',
        number: 122,
        zip: '12345',
      },
    });
  });
});
