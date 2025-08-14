const { models } = require('../db/models');

const addPlaylist = async (id, body) => {
  try {
    console.log('hitting model with data:', JSON.stringify(body, null, 2));

    const {
      playlist_name,
      playlist_notes,
      favourite,
      playlist_tracks,
      playlist_image,
    } = body;

    // Create the playlist first
    const insertedPlaylist = await models.Playlist.create({
      user_id: id,
      playlist_name,
      playlist_notes,
      favourite,
      playlist_image,
    });

    console.log('Created playlist:', insertedPlaylist.id);

    if (playlist_tracks && playlist_tracks.length > 0) {
      console.log(`Creating ${playlist_tracks.length} tracks...`);

      // Create tracks
      const createdTracks = await models.Track.bulkCreate(
        playlist_tracks.map((track) => ({
          track_title: track.track_title,
          track_artist: track.track_artist,
          track_bpm: track.track_bpm,
          track_length: track.track_length,
          favourite: track.favourite,
          track_image: track.track_image,
        }))
      );

      console.log(
        'Created tracks:',
        createdTracks.map((t) => ({ id: t.id, title: t.track_title }))
      );

      // Create playlist-track relationships
      const playlistTrackRelations = createdTracks.map((track, index) => ({
        playlist_id: insertedPlaylist.id,
        track_id: track.id,
        playlist_position: playlist_tracks[index].playlist_position,
      }));

      console.log('Creating relationships:', playlistTrackRelations);

      await models.PlaylistTrack.bulkCreate(playlistTrackRelations);

      console.log('Created playlist-track relationships');
    }

    // Retrieve the complete playlist with tracks
    const completePlaylist = await models.Playlist.findByPk(
      insertedPlaylist.id,
      {
        include: [
          {
            model: models.Track,
            as: 'tracks', // Make sure this alias matches your association
            through: {
              attributes: ['playlist_position'],
              as: 'PlaylistTrack', // Make sure this matches your through table alias
            },
          },
        ],
      }
    );

    console.log(
      'Retrieved complete playlist:',
      JSON.stringify(completePlaylist, null, 2)
    );

    return completePlaylist ? completePlaylist.get({ plain: true }) : null;
  } catch (err) {
    console.log('Model error:', err);
    throw err;
  }
};

module.exports = { addPlaylist };
