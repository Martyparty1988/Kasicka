const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/config/database');

describe('Authentication API', () => {
  beforeAll(async () => {
    // Connect to test database
    await sequelize.authenticate();
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'admin123'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('username', 'admin');
    });

    it('should fail with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
          email: 'test@example.com',
          roleId: 3 // Staff role
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should fail with duplicate username', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'admin', // Existing username
          password: 'testpassword',
          email: 'another@example.com',
          roleId: 3
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});
