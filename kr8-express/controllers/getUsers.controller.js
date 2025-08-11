const { fetchUsers, fetchUserById } = require('../models/fetchUsers.models');
const getAllUsers = async (req, res) => {
  try {
    console.log('inside users model');
    const users = await fetchUsers(); //usersArray
    res.status(200);
    res.json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(typeof id);
    // validate id
    const numericId = Number(id);
    if (isNaN(numericId)) {
      res.status(400);
      res.send('naughty!');
    }
    
    const user = await fetchUserById(numericId);
    
    res.status(200);
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllUsers, getUserById };
