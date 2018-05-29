import axios from 'axios';
import cookie from 'js-cookie';

function getHeader() {
  return {
    Authorization: `Bearer ${cookie.get('spotify_access')}`,
    'Content-Type': 'application/json',
  };
};

export function playTrack(trackId) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: getHeader(),
      data: {
        uris: [`spotify:track:${trackId}`],
      },
    }).then(
      res => resolve(res),
      err => reject(err),
    );
  });
}

export function pauseTrack() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: getHeader(),
    }).then(
      res => resolve(res),
      err => reject(err),
    );
  });
}

export function getDeviceStatus() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/player/devices',
      headers: getHeader(),
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function getPlayerStatus() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
      headers: getHeader(),
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

