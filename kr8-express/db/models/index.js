const sequelize = require('../seeds/connections');
const User = require('./users');
const Playlist = require('./playlists');
const Track = require('./track');
const PlaylistTrack = require('./playlistTrackJoin');

User.hasMany(Playlist, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Playlist.belongsTo(User, {
  foreignKey: 'userId',
});


Playlist.belongsToMany(Track, {
  through: PlaylistTrack,
  foreignKey: 'playlistId',
});

Track.belongsToMany(Playlist, {
  through: PlaylistTrack,
  foreignKey: 'trackId',
});


PlaylistTrack.belongsTo(Playlist, { foreignKey: 'playlistId' });
PlaylistTrack.belongsTo(Track, { foreignKey: 'trackId' });
Playlist.hasMany(PlaylistTrack, { foreignKey: 'playlistId' });
Track.hasMany(PlaylistTrack, { foreignKey: 'trackId' });

module.exports = {
  sequelize,
  User,
  Playlist,
  Track,
  PlaylistTrack,
};
