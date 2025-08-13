const {
  getAllUsers,
  getUserById,
  getPlaylistsByUserId,
  getNestedDataByUserId,
} = require('./controllers/getUsers.controller');

const {
  getAllPlaylists,
  getPlaylistById,
} = require('./controllers/getPlaylists.controller');
const getAllTracks = require('./controllers/getTracks.controller');
const playlistRouter = require('./routes/playlist.route');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/endpoint.json');
}); //test

// -------- USERS -------

//get users
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
//get playlists by user id
app.get('/api/users/:id/playlists', getPlaylistsByUserId);

//get full nested data
app.get('/api/users/:id/playlists/:id/tracks', getNestedDataByUserId);
// fix params on this, must be unique eg :userId and :playlistId

//post full nested data
app.use('/', playlistRouter);

// ----- PLAYLISTS ------

//get playlists
app.get('/api/playlists', getAllPlaylists);
app.get('/api/playlists/:id', getPlaylistById);

// ------ TRACKS ------

//get tracks
app.get('/api/tracks', getAllTracks);

module.exports = app;
