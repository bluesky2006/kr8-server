// db/connection.js
require('dotenv').config();
const path = require('path');
const { Sequelize } = require('sequelize');

const ENV = process.env.NODE_ENV || 'development';
const pathToEnvFile = path.resolve(__dirname, `../../.env.${ENV}`);

require('dotenv').config({
  path: pathToEnvFile,
});

console.log(`Running in ${ENV} mode`);

if (!process.env.PGDATABASE) {
  throw new Error('No PGDATABASE configured');
}

// Debug: Check what values are being used
console.log('Database config:', {
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD ? '[SET]' : '[NOT SET]',
  host: process.env.PGHOST || 'localhost',
});

const sequelize = new Sequelize(
  process.env.PGDATABASE, // database name
  null, // username (null = use system default)
  null, // password (null = no password)
  {
    // options object
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
  }
);

module.exports = sequelize;
