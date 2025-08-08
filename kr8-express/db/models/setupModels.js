// Model associations setup function

exports.setupAssociations = (models) => {
  const { User, Playlist, Track, PlaylistTrack } = models;

  // User has many Playlists
  User.hasMany(Playlist, {
    foreignKey: 'user_id',
    as: 'playlists',
  });

  // Playlist belongs to User
  Playlist.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  });

  // Many-to-many relationship between Playlist and Track through PlaylistTrack
  Playlist.belongsToMany(Track, {
    through: PlaylistTrack,
    foreignKey: 'playlist_id',
    otherKey: 'track_id',
    as: 'tracks',
  });

  Track.belongsToMany(Playlist, {
    through: PlaylistTrack,
    foreignKey: 'track_id',
    otherKey: 'playlist_id',
    as: 'playlists',
  });

  // Direct associations for easier querying
  PlaylistTrack.belongsTo(Playlist, {
    foreignKey: 'playlist_id',
    as: 'playlist',
  });

  PlaylistTrack.belongsTo(Track, {
    foreignKey: 'track_id',
    as: 'track',
  });

  Playlist.hasMany(PlaylistTrack, {
    foreignKey: 'playlist_id',
    as: 'playlistTracks',
  });

  Track.hasMany(PlaylistTrack, {
    foreignKey: 'track_id',
    as: 'playlistTracks',
  });
};

