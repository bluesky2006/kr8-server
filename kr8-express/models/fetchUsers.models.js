const { User, Playlist } = require('../db/models/index');
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

const fetchPlaylistsByUserId = async (id) => {
  try {
    const users = await User.findOne({
      where: { id },
      attributes: ['id', 'username'],
      include: [
        {
          model: Playlist,
          as: 'playlists',
          attributes: ['id', 'playlist_name', 'playlist_notes', 'favourite'],
        },
      ],
    });
    // console.log(users.get({ plain: true })); //removes object fluff
    return users ? users.get({ plain: true }) : null;
  } catch (err) {
    console.error(err);
  }
};

//get user id/playlists/:id/tracks

module.exports = { fetchUsers, fetchUserById, fetchPlaylistsByUserId };
