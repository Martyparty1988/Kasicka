import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

// Database configuration
const dbName = process.env.DB_NAME || 'minibar_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');

// Create Sequelize instance
const sequelize = new Sequelize({
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/models'], // Path to models
});

export default sequelize;
