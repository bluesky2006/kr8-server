const ImageService = require('../services/ImageService');

const convertPlaylistTracksImageToBuffer = (playListTracksArray) => {
  try {
    const copyOfArray = [...playListTracksArray];
    return copyOfArray.map((track) => {
      const imageHelper = new ImageService(track.track_image);
      return { ...track, track_image: imageHelper.handleImageUpload() };
    });
  } catch (err) {
    console.log(err, 'could not convert playlist-tracks-images');
  }
};

module.exports = { convertPlaylistTracksImageToBuffer };
