const getAllUsers = require('./models/getUsers.model');
const express = require('express');
const app = express();

app.get('/', getAllUsers);

module.exports = app;
