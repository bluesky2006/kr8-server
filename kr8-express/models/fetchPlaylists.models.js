const { models } = require('../db/models/index');
const fetchPlaylists = async () => {
  try {
    const playlist = await models.Playlist.findAll();
    const playlistArray = playlist.map((playlist) => {
      return playlist.dataValues;
    });
    // console.log(playlistArray);
    return playlistArray;
  } catch (err) {
    console.log(err);
  }
};

const fetchPlaylistById = async (id) => {
  try {
    const playlist = await Playlist.findAll({ where: { id: id } });
    console.log(playlist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { fetchPlaylists, fetchPlaylistById };
