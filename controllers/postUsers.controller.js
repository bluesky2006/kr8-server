const { addPlaylist } = require('../models/addPlaylist.models');

const postNestedDataByUserId = async (req, res) => {
  try {
    console.log('hitting controller');
    console.log('req.body keys:', Object.keys(req.body));
    console.log('req.files length:', req.files?.length || 0);

    const { id } = req.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return res.status(400).send('Invalid user ID');
    }

    // Reconstruct playlist_tracks from individual fields
    const trackCount = parseInt(req.body.track_count) || 0;
    const playlistTracks = [];

    for (let i = 0; i < trackCount; i++) {
      // Handle BPM conversion properly - convert empty string to null
      const bpmValue = req.body[`track_${i}_track_bpm`];
      const track = {
        playlist_position:
          parseInt(req.body[`track_${i}_playlist_position`]) || 0,
        track_artist: req.body[`track_${i}_track_artist`] || '',
        track_title: req.body[`track_${i}_track_title`] || '',
        track_bpm:
          bpmValue && bpmValue.trim() !== '' ? parseInt(bpmValue) : null,
        track_length: parseFloat(req.body[`track_${i}_track_length`]) || 0,
        favourite: req.body[`track_${i}_favourite`] === 'true',
      };

      // Find corresponding image file
      const imageFile = req.files?.find(
        (file) => file.fieldname === `track_image_${i}`
      );
      if (imageFile) {
        track.track_image = imageFile.buffer;
        console.log(
          `Attached image to track ${i}: ${imageFile.buffer.length} bytes`
        );
      }

      playlistTracks.push(track);
    }

    const playlistData = {
      playlist_name: req.body.playlist_name,
      playlist_notes: req.body.playlist_notes,
      favourite: req.body.favourite === 'true' || req.body.favourite === true,
      playlist_tracks: playlistTracks,
    };

    // Attach playlist image if exists
    const playlistImageFile = req.files?.find(
      (file) => file.fieldname === 'playlist_image'
    );
    if (playlistImageFile) {
      playlistData.playlist_image = playlistImageFile.buffer;
    }

    console.log('Reconstructed playlist data:', {
      ...playlistData,
      playlist_tracks: playlistData.playlist_tracks.map((track, i) => ({
        ...track,
        track_image: track.track_image
          ? `Buffer(${track.track_image.length} bytes)`
          : 'No image',
      })),
    });

    const insertedPlaylist = await addPlaylist(numericId, playlistData);

    console.log(
      'Final inserted playlist result:',
      JSON.stringify(insertedPlaylist, null, 2)
    );

    return res.status(201).json({
      message: 'Playlist created successfully',
      playlist: insertedPlaylist,
    });
  } catch (err) {
    console.error('Controller error:', err);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = { postNestedDataByUserId };
