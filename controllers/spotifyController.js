const request = require('request')

const config = require('../config');
const initSpotifyClientAuth = require('../helpers/spotifyClientAuth');

function minsSince(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60));
}

function tokenExpired() {
  return minsSince(new Date(config.spotify.tokenRefreshTime), new Date()) > 50;
}

function checkToken(cb) {
  if (!config.spotify.token || tokenExpired()) {
    initSpotifyClientAuth().then((res) => {
      config.spotify.token = res;
      config.spotify.tokenRefreshTime = new Date();
      cb(res);
    });
  } else {
    cb(config.spotify.token);
  }
}

exports.search = (req, res) => {
  const { query } = req.params;

  checkToken((token) => {
    const options = {
      url: `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };
    request.get(options, (error, response, body) => {
      res.send(body.tracks.items);
    });
  });
};

