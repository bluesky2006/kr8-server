const {
  extractTracksFromPlaylist,
  extractPlaylist,
} = require('../lib/utils/extractTrackData');

const {user, playlist} = require('../db/data/test-data/index');
describe('utils test', () => {
  describe('tests for extracting track data', () => {
    test('returns empty array when passed empty object', () => {
      const actual = extractTracksFromPlaylist({});
      expect(actual).toEqual([]);
    });

    test('returns tracks when passed playlist with playlist data and track data', () => {
      const expected = [
        {
          playlist_position: 1,
          track_title: 'Thriller Medley With Owner Of A Lonely Heart (Vocal)',
          track_artist: 'Local Boy',
          track_bpm: 122,
          track_length: 383.0133333333333,
          track_image: new Uint8Array([255, 120, 233, 252]),
        },
        {
          playlist_position: 2,
          track_title: 'Test song 2',
          track_artist: 'Roza Terenzi',
          track_bpm: 135,
          track_length: 400,
          track_image: new Uint8Array([255, 120, 233, 252]),
        },
      ];

      const actual = extractTracksFromPlaylist(playlist);
      expect(actual).toEqual(expected);
    });

    test('returns empty array when playlist_tracks is not an array', () => {
      const invalidPlaylist = {
        playlist_name: 'test',
        playlist_tracks: 'not an array',
      };
      const actual = extractTracksFromPlaylist(invalidPlaylist);
      expect(actual).toEqual([]);
    });

    test('returns empty array when playlist_tracks is missing', () => {
      const playlistWithoutTracks = {
        playlist_name: 'test',
        playlist_notes: 'some notes',
      };
      const actual = extractTracksFromPlaylist(playlistWithoutTracks);
      expect(actual).toEqual([]);
    });
  });
});

describe('extractPlaylist function', () => {
  describe('when passed valid playlist data', () => {
    test('returns playlist data without tracks array', () => {
      const actual = extractPlaylist(playlist);

      expect(actual).toMatchObject({
        playlist_name: 'test-playlist',
        playlist_notes: 'this playlist is sick',
      });

      expect(actual.playlist_image).toBeInstanceOf(Uint8Array);
      expect(actual.playlist_tracks).toBeUndefined();
    });

    test('preserves all playlist properties except playlist_tracks', () => {
      const playlistWithExtraProps = {
        playlist_name: 'Test Playlist',
        playlist_notes: 'Some notes',
        playlist_image: new Uint8Array([1, 2, 3, 4]),
        favourite: true,
        user_id: 123,
        custom_property: 'custom value',
        playlist_tracks: [
          { track_title: 'Track 1' },
          { track_title: 'Track 2' },
        ],
      };

      const actual = extractPlaylist(playlistWithExtraProps);

      expect(actual).toEqual({
        playlist_name: 'Test Playlist',
        playlist_notes: 'Some notes',
        playlist_image: new Uint8Array([1, 2, 3, 4]),
        favourite: true,
        user_id: 123,
        custom_property: 'custom value',
      });

      expect(actual.playlist_tracks).toBeUndefined();
    });

    test('handles playlist with no tracks array', () => {
      const playlistWithoutTracks = {
        playlist_name: 'No Tracks Playlist',
        playlist_notes: 'Empty playlist',
        user_id: 456,
      };

      const actual = extractPlaylist(playlistWithoutTracks);

      expect(actual).toEqual({
        playlist_name: 'No Tracks Playlist',
        playlist_notes: 'Empty playlist',
        user_id: 456,
      });
    });
  });

  describe('when passed invalid data', () => {
    test('returns empty object when passed null', () => {
      const actual = extractPlaylist(null);
      expect(actual).toEqual({});
    });

    test('returns empty object when passed undefined', () => {
      const actual = extractPlaylist(undefined);
      expect(actual).toEqual({});
    });

    test('returns empty object when passed empty object', () => {
      const actual = extractPlaylist({});
      expect(actual).toEqual({});
    });

    test('returns empty object when passed non-object types', () => {
      expect(extractPlaylist('string')).toEqual({});
      expect(extractPlaylist(123)).toEqual({});
      expect(extractPlaylist([])).toEqual({});
      expect(extractPlaylist(true)).toEqual({});
    });
  });

  describe('data integrity', () => {
    test('does not mutate original data', () => {
      const originalData = {
        playlist_name: 'Original',
        playlist_tracks: [{ track_title: 'Track 1' }],
      };

      const originalDataCopy = JSON.parse(JSON.stringify(originalData));

      extractPlaylist(originalData);

      expect(originalData).toEqual(originalDataCopy);
    });

    test('returns a deep copy (modifications do not affect original)', () => {
      const originalData = {
        playlist_name: 'Original',
        nested_object: { prop: 'value' },
        playlist_tracks: [{ track_title: 'Track 1' }],
      };

      const result = extractPlaylist(originalData);
      result.playlist_name = 'Modified';
      result.nested_object.prop = 'modified';

      expect(originalData.playlist_name).toBe('Original');
      expect(originalData.nested_object.prop).toBe('value');
    });
  });
});
