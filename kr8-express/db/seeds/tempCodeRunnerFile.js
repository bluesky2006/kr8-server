// db/connection.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const ENV = process.env.NODE_ENV || 'development';
const pathToCorrectEnvFile = `${__dirname}../../../.env.${ENV}`


require('dotenv').config({
  path: pathToCorrectEnvFile,
});

console.log(`Running in ${ENV} mode`);

if (!process.env.PGDATABASE) {
  throw new Error('No PGDATABASE configured');
}

// sequelize pool
const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  username: process.env.PGUSER || 'joelkram',
  password: process.env.PGPASSWORD || null,
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
