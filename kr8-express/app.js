const {getAllUsers, getUserById} = require('./controllers/getUsers.controller');

const getAllPlaylists = require('./controllers/getPlaylists.controller');
const getAllTracks = require('./controllers/getTracks.controller');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/endpoint.json');
}); //test

//get users
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);

//get playlists
app.get('/api/playlists', getAllPlaylists);

//get tracks
app.get('/api/tracks', getAllTracks);

module.exports = app;
