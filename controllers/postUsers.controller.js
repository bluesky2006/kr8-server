const { addPlaylist } = require('../models/addPlaylist.models');

const postNestedDataByUserId = async (req, res) => {
  try {
    console.log('hitting controller');
    const { id } = req.params;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).send('Invalid user ID');
    }

    // Parse playlist_tracks safely
    let tracks = [];
    if (req.body.playlist_tracks) {
      try {
        tracks = JSON.parse(req.body.playlist_tracks);
      } catch (err) {
        return res.status(400).send('Invalid JSON for playlist_tracks');
      }
    }

    const playlistData = {
      playlist_name: req.body.playlist_name,
      playlist_notes: req.body.playlist_notes,
      favourite: req.body.favourite === 'true' || req.body.favourite === true,
      playlist_tracks: Array.isArray(req.body.playlist_tracks)
        ? req.body.playlist_tracks
        : JSON.parse(req.body.playlist_tracks || '[]'),
    };

    // Attach playlist image
    if (req.files?.playlist_image?.[0]) {
      playlistData.playlist_image = req.files.playlist_image[0].buffer;
    }

    // Attach track images
    if (req.files?.track_images) {
      playlistData.playlist_tracks.forEach((track, index) => {
        if (req.files.track_images[index]) {
          track.track_image = req.files.track_images[index].buffer;
        }
      });
    }

    const insertedPlaylist = await addPlaylist(numericId, playlistData);

    return res.status(201).json({
      message: 'Playlist created successfully',
      playlist: insertedPlaylist,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { postNestedDataByUserId };
