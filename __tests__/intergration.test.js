const db = require('../db/seeds/connections');
const request = require('supertest');
const { models } = require('../db/models/index');
const app = require('../app');
const testPlaylist = require('../db/data/test-data/test-playlist');
beforeEach(async () => {
  await db.sync({ force: true });
  // create fake user
  const testUser = await models.User.create({
    username: 'testuser',
  });
});

afterAll(async () => {
  await db.close();
});
describe('testing routes', () => {
  test.todo(
    'In the interest of speed I have not written any tests - however I know there are a lot of error prone endpoints and edge cases to consider at the moment...'
  );
});

describe('post test', () => {
  test('testing post playlist full', async () => {
    const testPlaylist = {
      user_id: 1,
      playlist_name: 'doIWork',
      playlist_notes: 'please work',
      playlist_image: new Uint8Array([255, 200, 255, 100]),
      favourite: false,
      playlist_tracks: [
        {
          playlist_position: 1,
          track_title: 'Young Hearts',
          track_artist: 'Cyndi Lauper',
          track_bpm: 142,
          track_length: 383.0133333333333,
          track_image: new Uint8Array([255, 120, 233, 252]),
        },
        {
          playlist_position: 2,
          track_title: 'Wah wah wee wah',
          track_artist: 'Hello',
          track_bpm: 120,
          track_length: 123,
          track_image: new Uint8Array([255, 120, 233, 252]),
        },
      ],
    };
    await request(app)
      .post('/api/users/1/playlists')
      .send(testPlaylist)
      .expect(201)
      .set('Content-Type', 'application/json')
      .then(({ body }) => {
        console.log(body, 'answer from request');
        const { playlist } = body;
        expect(typeof playlist.id).toBe('number');
        expect(typeof playlist.playlist_name).toBe('string');
        expect(typeof playlist.playlist_notes).toBe('string');
        expect(typeof playlist.playlist_image).toBe('object');
        expect(typeof playlist.favourite).toBe('boolean');
        expect(typeof playlist.user_id).toBe('number');
        expect(typeof playlist.createdAt).toBe('string');
        expect(typeof playlist.updatedAt).toBe('string');
        expect(typeof playlist.tracks).toBe('object');
        playlist.tracks.forEach((track) => {
          console.log(track);
          expect(typeof track.id).toBe('number');
          expect(typeof track.track_title).toBe('string');
          expect(typeof track.track_artist).toBe('string');
          expect(typeof track.track_bpm).toBe('number');
          expect(typeof track.track_image).toBe('object');
          expect(typeof track.createdAt).toBe('string');
          expect(typeof track.updatedAt).toBe('string');
          expect(typeof track.id).toBe('number');
        });
      });
  });
});
