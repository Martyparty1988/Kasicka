const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/config/database');

describe('Order API', () => {
  let authToken;
  
  beforeAll(async () => {
    // Connect to test database
    await sequelize.authenticate();
    
    // Login to get auth token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin123'
      });
    
    authToken = loginRes.body.token;
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          villaId: 1,
          orderItems: [
            { itemId: 1, quantity: 2, pricePerUnit: 32 },
            { itemId: 2, quantity: 1, pricePerUnit: 59 }
          ],
          guestCount: 2,
          nightsCount: 3,
          discountPercentage: 10,
          currency: 'CZK',
          exchangeRate: 25,
          notes: 'Test order'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('orderNumber');
      expect(res.body).toHaveProperty('totalAmount');
      expect(res.body).toHaveProperty('finalAmount');
    });

    it('should fail with invalid data', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          // Missing required fields
          villaId: 1
        });
      
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /api/orders', () => {
    it('should get all orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should get a specific order', async () => {
      // First create an order to ensure we have one
      const createRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          villaId: 1,
          orderItems: [
            { itemId: 1, quantity: 1, pricePerUnit: 32 }
          ],
          guestCount: 1,
          nightsCount: 1,
          discountPercentage: 0,
          currency: 'CZK',
          exchangeRate: 25,
          notes: 'Test order for get'
        });
      
      const orderId = createRes.body.id;
      
      const res = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', orderId);
      expect(res.body).toHaveProperty('orderItems');
      expect(Array.isArray(res.body.orderItems)).toBeTruthy();
    });
  });
});
