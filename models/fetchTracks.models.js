const { models } = require('../db/models/index');
const fetchTracks = async () => {
  try {
    const tracks = await models.Track.findAll();
    const trackArray = tracks.map((track) => {
      return track.dataValues;
    });
    // console.log(trackArray);
    return trackArray;
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchTracks;
