const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/config/database');

describe('Invoice API', () => {
  let authToken;
  let orderId;
  
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
    
    // Create an order to use for invoice tests
    const orderRes = await request(app)
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
        notes: 'Test order for invoice'
      });
    
    orderId = orderRes.body.id;
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  describe('POST /api/invoices', () => {
    it('should create a new invoice', async () => {
      const res = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          orderId: orderId,
          paymentMethodId: 1, // Cash
          status: 'pending'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('invoiceNumber');
      expect(res.body).toHaveProperty('orderId', orderId);
      expect(res.body).toHaveProperty('status', 'pending');
    });

    it('should fail with invalid data', async () => {
      const res = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          // Missing required fields
          orderId: orderId
        });
      
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /api/invoices', () => {
    it('should get all invoices', async () => {
      const res = await request(app)
        .get('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('GET /api/invoices/:id', () => {
    it('should get a specific invoice', async () => {
      // First create an invoice to ensure we have one
      const createRes = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          orderId: orderId,
          paymentMethodId: 1,
          status: 'paid'
        });
      
      const invoiceId = createRes.body.id;
      
      const res = await request(app)
        .get(`/api/invoices/${invoiceId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', invoiceId);
      expect(res.body).toHaveProperty('orderId', orderId);
      expect(res.body).toHaveProperty('status', 'paid');
    });
  });

  describe('PUT /api/invoices/:id/status', () => {
    it('should update invoice status', async () => {
      // First create an invoice to update
      const createRes = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          orderId: orderId,
          paymentMethodId: 1,
          status: 'pending'
        });
      
      const invoiceId = createRes.body.id;
      
      const res = await request(app)
        .put(`/api/invoices/${invoiceId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'paid'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', invoiceId);
      expect(res.body).toHaveProperty('status', 'paid');
    });
  });
});
