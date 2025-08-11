const {fetchPlaylists, fetchPlaylistById} = require('../models/fetchPlaylists.models');
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

const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(typeof id);
    // validate id
    const numericId = Number(id);
    if (isNaN(numericId)) {
      res.status(400);
      res.send('naughty!');
    }

    const playlist = fetchPlaylistById(numericId);
    //validate 
    if (playlist) {
      res.status(200);
      res.send({ playlist });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getAllPlaylists, getPlaylistById };
