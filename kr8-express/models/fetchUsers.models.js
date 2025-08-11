const { User } = require('../db/models/index');
const fetchUsers = async () => {
  try {
    
    const users = await User.findAll();
    const usersArray = users.map((user) => {
      return user.dataValues;
    })
    console.log(usersArray);
    return usersArray;
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchUsers;
