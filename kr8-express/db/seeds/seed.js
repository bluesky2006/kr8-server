const db = require('../seeds/connections');
const {
  extractTracksFromPlaylist,
  extractPlaylist,
} = require('../../lib/utils/extractTrackData');
const { User, Playlist, Track, PlaylistTrack } = require('../models/index');

seed = async ({ user, playlist }) => {
  try {
    // console.log(user, 'user array of objects in seed');
    // console.log(playlist, 'playlist object in seed');

    await db.authenticate();
    //drop tables
    await PlaylistTrack.drop({ cascade: true });
    await Track.drop({ cascade: true });
    await Playlist.drop({ cascade: true });
    await User.drop({ cascade: true });

    await db.sync();

    // 1. Seed users
    // console.log(user, 'before creating user table');
    const users = await User.bulkCreate(user, { returning: true });
    // console.log('created users:', users);

    // 2. Seed playlist (without tracks)
    const playlistData = extractPlaylist(playlist);
    // console.log(playlistData, 'in seed');
    const createdPlaylist = await Playlist.create(playlistData);

    // 3. Seed tracks
    const tracksData = extractTracksFromPlaylist(playlist);
    const createdTracks = await Track.bulkCreate(tracksData, {
      returning: true,
    });

    // 4. Seed join table (PlaylistTrack)
    await Promise.all(
      tracksData.map((track, idx) =>
        PlaylistTrack.create({
          playlist_id: createdPlaylist.id,
          track_id: createdTracks[idx].id,
          playlist_position: track.playlist_position,
        })
      )
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
