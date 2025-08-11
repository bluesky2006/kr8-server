const fetchUsers = require('../models/fetchUsers.models');
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
    console.log(id);
    console.log('inside get user by id');
    
    res.status(200);
    res.send('');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllUsers, getUserById };
