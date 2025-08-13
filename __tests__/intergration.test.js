const db = require('../db/seeds/connections');
const request = require('supertest');
const { models } = require('../db/models/index');
const app = require('../app');
const testPlaylist = require('../db/data/test-data/test-playlist');
beforeEach(async () => {
  await db.sync({ force: true });
  await models.User.create({ username: 'testuser' });
});

afterAll(async () => {
  await db.close();
});

describe('post test (multipart/form-data)', () => {
  test('testing post playlist full (with images)', async () => {
    const playlistMeta = {
      playlist_name: 'doIWork',
      playlist_notes: 'please work',
      favourite: false,
      playlist_tracks: [
        {
          playlist_position: 1,
          track_title: 'Young Hearts',
          track_artist: 'Cyndi Lauper',
          track_bpm: 142,
          track_length: 383.0133333333333,
        },
        {
          playlist_position: 2,
          track_title: 'Wah wah wee wah',
          track_artist: 'Hello',
          track_bpm: 120,
          track_length: 123,
        },
      ],
    };

    await request(app)
      .post('/api/users/1/playlists')
      
      .field('playlist_name', playlistMeta.playlist_name)
      .field('playlist_notes', playlistMeta.playlist_notes)
      .field('favourite', playlistMeta.favourite)
      .field('playlist_tracks', JSON.stringify(playlistMeta.playlist_tracks))
      // Files
      .attach(
        'playlist_image',
        Buffer.from([255, 200, 255, 100]),
        'playlist.jpg'
      )
      .attach('track_images', Buffer.from([255, 120, 233, 252]), 'track1.jpg')
      .attach('track_images', Buffer.from([255, 120, 233, 252]), 'track2.jpg')
      .expect(201)
      .then(({ body }) => {
        const { playlist } = body;
        expect(typeof playlist.id).toBe('number');
        expect(typeof playlist.playlist_name).toBe('string');
        expect(typeof playlist.playlist_notes).toBe('string');
        expect(typeof playlist.playlist_image).toBe('object');
        expect(typeof playlist.favourite).toBe('boolean');
        expect(typeof playlist.user_id).toBe('number');
        expect(typeof playlist.createdAt).toBe('string');
        expect(typeof playlist.updatedAt).toBe('string');
        expect(Array.isArray(playlist.tracks)).toBe(true);
        playlist.tracks.forEach((track) => {
          expect(typeof track.id).toBe('number');
          expect(typeof track.track_title).toBe('string');
          expect(typeof track.track_artist).toBe('string');
          expect(typeof track.track_bpm).toBe('number');
          expect(typeof track.track_image).toBe('object');
        });
      });
  });

  test('image is null still posts', async () => {
    const playlistMeta = {
      playlist_name: 'doIWork',
      playlist_notes: 'please work',
      favourite: false,
      playlist_tracks: [
        {
          playlist_position: 1,
          track_title: 'Young Hearts',
          track_artist: 'Cyndi Lauper',
          track_bpm: 142,
          track_length: 383.0133333333333,
        },
        {
          playlist_position: 2,
          track_title: 'Wah wah wee wah',
          track_artist: 'Hello',
          track_bpm: 120,
          track_length: 123,
        },
      ],
    };

    await request(app)
      .post('/api/users/1/playlists')
      .field('playlist_name', playlistMeta.playlist_name)
      .field('playlist_notes', playlistMeta.playlist_notes)
      .field('favourite', playlistMeta.favourite)
      .field('playlist_tracks', JSON.stringify(playlistMeta.playlist_tracks))
      // No playlist_image
      // No track_images
      .expect(201)
      .then(({ body }) => {
        const { playlist } = body;
        expect(typeof playlist.id).toBe('number');
        expect(typeof playlist.playlist_name).toBe('string');
        expect(typeof playlist.playlist_notes).toBe('string');
        expect(playlist.playlist_image).toBe(null);
        expect(typeof playlist.favourite).toBe('boolean');
        expect(typeof playlist.user_id).toBe('number');
        expect(typeof playlist.createdAt).toBe('string');
        expect(typeof playlist.updatedAt).toBe('string');
        expect(Array.isArray(playlist.tracks)).toBe(true);
        playlist.tracks.forEach((track) => {
          expect(typeof track.id).toBe('number');
          expect(typeof track.track_title).toBe('string');
          expect(typeof track.track_artist).toBe('string');
          expect(typeof track.track_bpm).toBe('number');
          expect(track.track_image).toBe(null);
        });
      });
  });
});
