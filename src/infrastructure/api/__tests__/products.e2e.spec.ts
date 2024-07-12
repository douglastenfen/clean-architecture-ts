import request from 'supertest';
import { app, sequelize } from '../express';

describe('E2E test for products', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      id: '123',
      name: 'Product 1',
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: '123',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should get all products', async () => {
    const responseProduct1 = await request(app).post('/products').send({
      id: '123',
      name: 'Product 1',
      price: 100,
    });
    expect(responseProduct1.status).toBe(200);

    const responseProduct2 = await request(app).post('/products').send({
      id: '456',
      name: 'Product 2',
      price: 200,
    });
    expect(responseProduct2.status).toBe(200);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body.products).toMatchObject([
      {
        id: '123',
        name: 'Product 1',
        price: 100,
      },
      {
        id: '456',
        name: 'Product 2',
        price: 200,
      },
    ]);
  });
});
