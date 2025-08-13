const { models } = require('../db/models');
const {
  convertPlaylistTracksImageToBuffer,
} = require('../lib/utils/convertPlaylistTracksImageToBuffer');

const addPlaylist = async (id, body) => {
  try {
    console.log('hitting model');
    const {
      playlist_name,
      playlist_notes,
      favourite,
      playlist_tracks,
      playlist_image,
    } = body;

    const insertedPlaylist = await models.Playlist.create({
      user_id: id,
      playlist_name,
      playlist_notes,
      favourite,
      playlist_image,
    });

    if (playlist_tracks && playlist_tracks.length > 0) {
      // Track images are also already Buffers
      const createdTracks = await models.Track.bulkCreate(playlist_tracks);

      const playlistTrackRelations = createdTracks.map((track, index) => ({
        playlist_id: insertedPlaylist.id,
        track_id: track.id,
        playlist_position: playlist_tracks[index].playlist_position,
      }));

      await models.PlaylistTrack.bulkCreate(playlistTrackRelations);
    }

    const completePlaylist = await models.Playlist.findByPk(
      insertedPlaylist.id,
      {
        include: [
          {
            model: models.Track,
            as: 'tracks',
            through: { attributes: ['playlist_position'] },
          },
        ],
      }
    );

    return completePlaylist ? completePlaylist.get({ plain: true }) : null;
  } catch (err) {
    console.log('Model error:', err);
    throw err;
  }
};

module.exports = { addPlaylist };
