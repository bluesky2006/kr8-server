//playlist for user 1 simon (needs FK)
const testPlaylist = {
  user_id: 1,
  playlist_name: 'test-playlist',
  playlist_notes: 'this playlist is sick',
  playlist_image: new Uint8Array([255, 200, 255, 100]),
  favourite: false,
  playlist_tracks: [
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
  ],
};

module.exports = testPlaylist;