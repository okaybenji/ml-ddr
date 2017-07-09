const SpotifyWebApi = require('spotify-web-api-node');
const keys = require('./private');

const spotify = new SpotifyWebApi({
  clientId: keys.id,
  clientSecret: keys.secret,
});

const log = (str) => console.log(str);

const setToken = (res) => {
  spotify.setAccessToken(res.body.access_token);
  return Promise.resolve(); // just make synchronous call chainable
};

const runQuery = (res) => {
  const query = 'linda ronstadt don\'t know much';
  const types = ['track'];

  return spotify.search(query, types);
};

const buildTrackData = (res) => {
  const track = res.body.tracks.items[0];

  const buildArtistString = (str, artist, i, arr) => {
    if (arr.length === i + 1) {
      if (i === 0) {
        return str + artist.name;
      }
      return str + 'and ' + artist.name;
    }
    if (arr.length === 2) {
      return str + artist.name + ' ';
    }
    return str + artist.name + ', ';
  };

  return Promise.resolve({
    id: track.id,
    title: track.name,
    artist: track.artists.reduce(buildArtistString, ''),
    album: track.album.name,
    art: track.album.images[0].url,
  });
};

const getBpm = (track) => {
  /**
   * NOTE: getAudioFeaturesForTrack and getAudioAnalysisForTrack both return much
   * more data which would probably help the computer identify useful correlations
   * for when to use certain style/patterns in DDR tracks. getAudioFeaturesForTrack
   * has properties such as danceability, energy and loudness.
   * getAudioAnalysisForTrack breaks down the song into a large number of segments
   * each with their own loudness rating.
   */
  return spotify.getAudioFeaturesForTrack(track.id)
    .then(res => {
      // Spotify's BPMs are not exact.
      // Note that this will not work for songs with decimal BPMs. :(
      track.bpm = Math.round(res.body.tempo);
      return track;
    });
};

spotify
  .clientCredentialsGrant()
  .then(setToken)
  .then(runQuery)
  .then(buildTrackData)
  .then(getBpm)
  .then(log)
  .catch(log);

