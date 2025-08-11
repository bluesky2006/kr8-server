const { Playlist } = require('../db/models/index');
const fetchPlaylists = async () => {
  try {
    const playlist = await Playlist.findAll();
    const playlistArray = playlist.map((playlist) => {
      return playlist.dataValues;
    });
    console.log(playlistArray);
    return playlistArray;
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchPlaylists;
