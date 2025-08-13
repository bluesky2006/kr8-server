const { DataTypes } = require('sequelize');

// Junction table for Playlist-Track many-to-many relationship
exports.PlaylistTrack = (sequelize) => {
  return sequelize.define('PlaylistTrack', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'playlists',
        key: 'id',
      },
    },
    track_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tracks',
        key: 'id',
      },
    },
    playlist_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'playlist_tracks',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['playlist_id', 'playlist_position'], 
      },
    ],
  });
};

