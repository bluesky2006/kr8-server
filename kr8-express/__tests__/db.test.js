const db = require('../db/seeds/connections');
const { User, Playlist, Track, PlaylistTrack } = require('../db/models/index');
const seed = require('../db/seeds/seed');
const testData = require('../db/test-data/index');

beforeEach(async () => {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  console.log(`PGDATABASE: ${process.env.PGDATABASE}`);
  await seed(testData);
});

afterAll(async () => {
  await db.close();
});

describe('testing db',  () => {
  test('setup db', async () => {
const result = await seed(testData);
console.log(result)
  });
});
