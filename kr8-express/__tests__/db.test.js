const db = require('../db/seeds/connections');
const { User, Playlist, Track, PlaylistTrack } = require('../db/models/index');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(async () => {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  console.log(`PGDATABASE: ${process.env.PGDATABASE}`);
  await seed(testData.user, testData.playlist);
});

afterAll(async () => {
  await db.close();
});

describe('testing database', () => {
  describe('users table', () => {
    test('users table exists', async () => {
      const people = await User.findAll();
      const person = people[0].dataValues;
      expect(person.dataValues.id).toBe(1);
    });
  });
});
