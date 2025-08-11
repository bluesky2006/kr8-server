const fetchTracks = require('../models/fetchTracks.models')
const getAllTracks = async (req, res) => {
  try {
    console.log('inside tracks controller');
    const tracks = await fetchTracks();
    res.json({ tracks });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = getAllTracks;
