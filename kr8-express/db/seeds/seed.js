const db = require('../seeds/connections');
const { User, Playlist, Track, PlaylistTrack } = require('../models/index');

seed = async ({ user, playlist }) => {
  try {
    await db.authenticate();
    //drop tables
    await PlaylistTrack.drop({cascade: true});
    await Track.drop({cascade: true});
    await Playlist.drop({cascade: true});
    await User.drop({cascade: true});
    
    //seed tables
    await db.sync({force: true});
    
    //users
    const users = await User.create(user);
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
