const {
  getAllUsers,
  getUserById,
  getPlaylistsByUserId,
} = require('./controllers/getUsers.controller');

const {
  getAllPlaylists,
  getPlaylistById,
} = require('./controllers/getPlaylists.controller');
const getAllTracks = require('./controllers/getTracks.controller');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/endpoint.json');
}); //test

// -------- USERS -------

//get users
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
//get playlists by user id
app.get('/api/users/:id/playlists', getPlaylistsByUserId);

// ----- PLAYLISTS ------

//get playlists
app.get('/api/playlists', getAllPlaylists);
app.get('/api/playlists/:id', getPlaylistById);

//get tracks
app.get('/api/tracks', getAllTracks);

module.exports = app;
