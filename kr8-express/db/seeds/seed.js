const { sequelize, Playlist, Track, User } = require('../models/index');
//test

async function setupWithBlobs() {
  try {
    await sequelize.sync({ force: true });

    const user = await User.create({
      username: 'test_user',
    });

    const playlist = await Playlist.create({
      playlist_name: 'ballad',
      userId: user.id,
    });

    // If keeping BLOB storage, use Buffer instead of Uint8Array
    const tracks = await Track.bulkCreate([
      {
        track_title: 'The Ballad of Ace Lebaron',
        track_artist: 'Tilman Silescu',
        track_image: Buffer.from([255, 216, 255, 224]), // Use Buffer for BLOB
      },
      {
        track_title: 'Adrift Break - All',
        track_artist: 'Unknown Artist',
        track_image: null,
      },
      {
        track_title: 'Jungle Juice',
        track_artist: 'Fantastic Man',
        track_image: Buffer.from([255, 216, 255, 225]), // Use Buffer for BLOB
      },
    ]);

    await playlist.addTracks(tracks);
    console.log('🎉 Seeded successfully with BLOBs!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the seeding
setupWithBlobs();
