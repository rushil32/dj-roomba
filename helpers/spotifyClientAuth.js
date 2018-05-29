const request = require('request');

const config = require('../config');

const { clientId } = config.spotify;
const clientSecret = config.spotify.secret;

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
};

module.exports = function initSpotifyClientAuth() {
  return new Promise((resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        resolve(token);
      } else {
        reject(new Error(response.statusCode));
      }
    });
  });
};
