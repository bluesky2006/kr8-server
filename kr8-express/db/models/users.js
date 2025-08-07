const { DataTypes } = require('sequelize');
const sequelize = require('../seeds/connections');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, // FIXED: Added autoIncrement
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
