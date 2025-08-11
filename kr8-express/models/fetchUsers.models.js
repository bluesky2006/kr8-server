const { User } = require('../db/models/index');
const fetchUsers = async () => {
  try {
    const users = await User.findAll();
    const usersArray = users.map((user) => {
      return user.dataValues;
    });
    console.log(usersArray);
    return usersArray;
  } catch (err) {
    console.log(err);
  }
};

const fetchUserById = async (id) => {
  try {
    const users = await User.findAll({ where: { id: id } });
    const user = users[0].dataValues;

    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { fetchUsers, fetchUserById };
