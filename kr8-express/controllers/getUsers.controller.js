const fetchUsers = require('../models/fetchUsers.models');
const getAllUsers = async (req, res) => {
  try {
    console.log('inside users model');
    const users = await fetchUsers(); //usersArray
    res.json({users});
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = getAllUsers;
