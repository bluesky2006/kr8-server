const { DataTypes } = require('sequelize');
const sequelize = require('../seeds/connections');

const PlaylistTrack = sequelize.define(
  'PlaylistTrack',
  {
    id: {
      
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Playlists',
        key: 'id',
      },
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tracks',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'playlist_tracks', 
  }
);

module.exports = PlaylistTrack;
