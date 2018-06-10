const querystring = require('querystring');
const request = require('request');

const { spotify } = require('../config');

const userCtrl = require('./userController');

exports.spotifyAuth = (req, res) => {
  res.send({
    url: `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: spotify.clientId,
      scope: spotify.scope,
      redirect_uri: spotify.redirectUri,
    })}`,
  });
};

function getSpotifyUser(accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: `Bearer ${accessToken}` },
      json: true,
    };

    request.get(options, (error, response, body) => {
      if (body && body.error) reject(body.error.status);
      resolve(body);
    });
  });
}

function refreshSpotifyToken(refreshToken) {
  return new Promise((resolve, reject) => {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(spotify.clientId + ':' + spotify.secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        resolve(access_token);
      }
    });
  });
}

exports.getUserInfo = (req, res) => {
  const { spotify_access, spotify_refresh } = req.cookies;
  let newToken = '';

  if (spotify_refresh) {
    refreshSpotifyToken(spotify_refresh)
      .then((accessToken) => {
        newToken = accessToken;
        return getSpotifyUser(accessToken);
      })
      .then(user => userCtrl.getSpotifyUser(user.id))
      .then(user => res.send({
        newToken,
        user,
      }));
  }
};

exports.spotifyLogin = (req, res) => {
  const code = req.body.code || null;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: spotify.redirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: 'Basic ' + (new Buffer(spotify.clientId + ':' + spotify.secret).toString('base64'))
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body;

      getSpotifyUser(access_token)
        .then(user => userCtrl.createUser(user))
        .then(user => res.send({
          userInfo: user,
          access_token,
          refresh_token,
        }));
    } else {
      res.status(400).send();
    }
  });
};

