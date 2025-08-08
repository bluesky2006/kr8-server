// db/connection.js
require('dotenv').config();
console.log('Environment variables:');
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '[SET]' : '[NOT SET]');
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGDATABASE:', process.env.PGDATABASE);
const { Sequelize } = require('sequelize');

const ENV = process.env.NODE_ENV || 'development';
console.log(`Running in ${ENV} mode`);

if (ENV === 'development') {
  process.env.PGDATABASE = 'kr8_database';
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
