const { models } = require('../db/models');
const {
  convertPlaylistTracksImageToBuffer,
} = require('../lib/utils/convertPlaylistTracksImageToBuffer');
const ImageHelper = require('../lib/services/ImageService');
const addPlaylist = async (id, body) => {
  try {
    const {
      playlist_name,
      playlist_notes,
      favourite,
      playlist_tracks,
      playlist_image,
    } = body;

    const imageConverter = new ImageHelper(playlist_image);
    const imageBuffer = imageConverter.handleImageUpload();

    //convert playlist nested tracks
    let convertedTracks = [];
    if (playlist_tracks && playlist_tracks.length > 0) {
      convertedTracks = convertPlaylistTracksImageToBuffer(playlist_tracks);
    }

    const insertedPlaylist = await models.Playlist.create({
      user_id: id,
      playlist_name,
      playlist_notes,
      favourite,
      playlist_image: imageBuffer,
    });

    if (playlist_tracks && playlist_tracks.length > 0) {
      // Add tracks
      const createdTracks = await models.Track.bulkCreate(convertedTracks);

      // Add relationship
      const playlistTrackRelations = createdTracks.map((track, index) => ({
        playlist_id: insertedPlaylist.id,
        track_id: track.id,
        playlist_position: playlist_tracks[index].playlist_position,
      }));

      await models.PlaylistTrack.bulkCreate(playlistTrackRelations);
    }

    // fetch complete playlist
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
