const getAllUsers = require('./controllers/getUsers.controller');
const getAllPlaylists = require('./controllers/getPlaylists.controller');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
}); //test

//get users
app.get('/api/users', getAllUsers);

//get playlists
app.get('/api/playlists', getAllPlaylists);

module.exports = app;
