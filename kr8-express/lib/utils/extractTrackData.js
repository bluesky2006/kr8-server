exports.extractTracksFromPlaylist = (playlistData) => {
  const copyOfData = structuredClone(playlistData);
  if (!copyOfData || !Array.isArray(copyOfData.playlist_tracks)) return [];
  return copyOfData.playlist_tracks;
};

exports.extractPlaylist = (playlistData) => {
  if (!playlistData || typeof playlistData !== 'object') return {};

  const copyOfData = structuredClone(playlistData);
  const { playlist_tracks, ...playlist } = copyOfData;
  console.log('Extracted playlist:', playlist);
  return playlist;
};
