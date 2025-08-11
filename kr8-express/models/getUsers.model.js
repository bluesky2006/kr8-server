const fetchUsers = require('../controllers/fetchUsers.controller');
const getAllUsers = async (req, res) => {
  try {
    console.log('inside users model');
    const fetchedUsers = fetchUsers();
    return res.send('hello world');
  } catch (err) {
    console.log(err);
  }
};

module.exports = getAllUsers;
