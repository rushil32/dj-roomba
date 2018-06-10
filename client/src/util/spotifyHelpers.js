import axios from 'axios';
import cookie from 'js-cookie';

function getHeader() {
  return {
    Authorization: `Bearer ${cookie.get('spotify_access')}`,
    'Content-Type': 'application/json',
  };
}

export function createPlaylist(name, spotifyId) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `https://api.spotify.com/v1/users/${spotifyId}/playlists`,
      headers: getHeader(),
      data: {
        name,
        public: false,
      },
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function getUserPlaylists(spotifyId) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/users/${spotifyId}/playlists`,
      headers: getHeader(),
    }).then(
      res => resolve(res.data.items),
      err => reject(err),
    );
  });
}

export function addToPlaylist(spotifyId, playlistId, tracks) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `https://api.spotify.com/v1/users/${spotifyId}/playlists/${playlistId}/tracks`,
      headers: getHeader(),
      data: {
        uris: tracks.map(track => track.trackUrl),
      },
    }).then(
      res => resolve(res),
      err => reject(err),
    );
  });
}

export function getUserFavs() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/top/tracks?limit=10',
      headers: getHeader(),
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}
