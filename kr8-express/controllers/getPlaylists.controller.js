const fetchPlaylists = require('../models/fetchPlaylists.models');
const getAllPlaylists = async (req, res) => {
  try {
    console.log('inside playlists model');
    const playlists = await fetchPlaylists(); //usersArray
    res.json({ playlists });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = getAllPlaylists;
