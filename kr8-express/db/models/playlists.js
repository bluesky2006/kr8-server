const { DataTypes } = require('sequelize');
const sequelize = require('../seeds/connections');

const Playlist = sequelize.define('Playlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  playlist_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // REMOVED: playlist_track_id - not needed with junction table
});

module.exports = Playlist;
