const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/config/database');

describe('Villa API', () => {
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

  describe('GET /api/villas', () => {
    it('should get all villas', async () => {
      const res = await request(app)
        .get('/api/villas')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/villas/:id', () => {
    it('should get a specific villa', async () => {
      const res = await request(app)
        .get('/api/villas/1')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
    });

    it('should return 404 for non-existent villa', async () => {
      const res = await request(app)
        .get('/api/villas/999')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /api/villas/:id/inventory', () => {
    it('should get inventory for a specific villa', async () => {
      const res = await request(app)
        .get('/api/villas/1/inventory')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('villaSpecificItems');
      expect(res.body).toHaveProperty('sharedItems');
      expect(Array.isArray(res.body.villaSpecificItems)).toBeTruthy();
      expect(Array.isArray(res.body.sharedItems)).toBeTruthy();
    });
  });
});
