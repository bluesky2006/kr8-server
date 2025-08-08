const { DataTypes } = require('sequelize');


// Playlist Model
exports.Playlist = (sequelize) => {
  return sequelize.define('Playlist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playlist_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    playlist_image: {
      type: DataTypes.BLOB('long'), 
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {
    tableName: 'playlists',
    timestamps: true,
  });
};


