const db = require('../seeds/connections');
const User = require('./users');
const Playlist = require('./playlists');
const Track = require('./track');
const PlaylistTrack = require('./playlistTrackJoin');
const {setupAssociations} = require('./setupModels');

// Create models object
const models = {
  User,
  Playlist,
  Track,
  PlaylistTrack,
};

// Setup associations between models
setupAssociations(models);


const createTables = async (options = { force: false }) => {
  try {
    console.log('Creating database tables...');
    await db.sync(options);
    console.log('All tables have been created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

// Export individual models and utilities
module.exports = {
  // Database connection
  db,

  // Individual models (for your seed function imports)
  User,
  Playlist,
  Track,
  PlaylistTrack,

  // Models object (if needed elsewhere)
  models,

  // Utility functions
  setupAssociations,
  createTables,
};
