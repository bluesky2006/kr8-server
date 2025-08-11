const db = require('../db/seeds/connections');
const { User, Playlist, Track, PlaylistTrack } = require('../db/models/index');
const seed = require('../db/seeds/seed');
const { user, playlist } = require('../db/data/test-data/index');

beforeEach(async () => {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  console.log(`PGDATABASE: ${process.env.PGDATABASE}`);
  await seed({ user, playlist });
});

afterAll(async () => {
  await db.close();
});

describe('testing database', () => {
  describe('users table', () => {
    test('users table exists', async () => {
      const people = await User.findAll();
      // console.log(people, 'people');
      const person = people[0].dataValues;
      // console.log(person, 'person');
      expect(people).not.toHaveLength(0);
      expect(person.id).toBe(1);
      expect(person.username).toBe('testGuy');
    });
    test('users table has correct properties', async () => {
      const people = await User.findAll();

      const person = people[1].dataValues; // number in array
      expect(person.id).toBe(2);
      expect(person.username).toBe('ajskdj');
    });
  });
  describe('testing playlist', () => {
    describe('playlist table exists', () => {
      test('playlist table has length > 0', async () => {
        const playlists = await Playlist.findAll();
        // console.log(playlists, 'playlist correct?');
        // const playlist = playlists[0].dataValues;
        expect(playlists).not.toHaveLength(0);
      });
    });
  });
  describe('playlist table has correct properties', () => {
    test('playlist table has correct properties', async () => {
      const playlists = await Playlist.findAll();

      const playlist = playlists[0].dataValues;
      expect(playlist.id).toBe(1);
      expect(playlist.playlist_name).toBe('test-playlist');
      expect(playlist.playlist_notes).toBe('this playlist is sick');
    });
  });
});
