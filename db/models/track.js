const { DataTypes } = require('sequelize');


// Track Model
exports.Track = (sequelize) => {
  return sequelize.define('Track', {
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
    track_bpm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    track_length: {
      type: DataTypes.DECIMAL(10, 4), // Supports decimal seconds
      allowNull: true,
    },
    track_image: {
      type: DataTypes.BLOB('long'), 
      allowNull: true,
    },
  }, {
    tableName: 'tracks',
    timestamps: true,
  });
};


