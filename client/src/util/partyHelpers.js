import axios from 'axios';
import * as spotifyUtil from './spotifyHelpers';

export function createParty(host, title) {
  return new Promise((resolve, reject) => {
    axios.post('/api/parties/new', {
      title,
      host,
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function getParty(id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/parties/info/${id}`).then(
      res => resolve(res.data),
      err => console.log(err),
    );
  });
}

export function shuffleTracks(id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/parties/shuffle/${id}`).then(
      res => resolve(res.data),
      err => console.log(err),
    );
  });
}

export function getUserList(id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/parties/user/${id}`).then(
      res => resolve(res.data),
      err => console.log(err),
    );
  });
}

export function getPartyList() {
  return new Promise((resolve, reject) => {
    axios.get('/api/parties/all').then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function addTracks(userId, partyId, tracks) {
  return new Promise((resolve, reject) => {
    axios.put('/api/parties/add-tracks', {
      userId,
      partyId,
      tracks,
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function removeTrack(partyId, trackId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/parties/remove-track', {
      partyId,
      trackId,
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function toggleVote(partyId, trackId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/parties/vote', {
      partyId,
      trackId,
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}

export function addUserFavs(userId, partyId) {
  return new Promise((resolve, reject) => {
    spotifyUtil.getUserFavs()
      .then(res => addTracks(userId, partyId, res.items))
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}
