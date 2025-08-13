const { addPlaylist } = require('../models/addPlaylist.models');
const postNestedDataByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const playlistData = req.body;

    // validate id
    const numericId = Number(id);
    if (isNaN(numericId)) {
      res.status(400);
      res.send('naughty!');
    }

    const insertedPlaylist = await addPlaylist(numericId, playlistData);

    res.status(201).json({
      message: 'Playlist created successfully',
      playlist: insertedPlaylist,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postNestedDataByUserId };
