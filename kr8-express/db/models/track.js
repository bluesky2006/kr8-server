const { DataTypes } = require('sequelize');
const sequelize = require('../seeds/connections');

const Track = sequelize.define(
  'Track',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    track_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track_artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track_image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  },
  {
    tableName: 'tracks',
  }
);

module.exports = Track;
