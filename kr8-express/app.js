const getAllUsers = require('./controllers/getUsers.controller');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
}); //test

//get users
app.get('/api/users', getAllUsers);

module.exports = app;
