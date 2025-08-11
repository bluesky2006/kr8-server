const { User } = require('../db/models/index');
const fetchUsers = async () => {
  try {
    console.log('in fetch users');
    const users = await User.findAll();
    console.log(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchUsers;
