import axios from 'axios';

export function getParty(id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/parties/info/${id}`).then(
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

export function addTrack(partyId, trackData) {
  return new Promise((resolve, reject) => {
    axios.put('/api/parties/add-track', {
      partyId,
      trackData,
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
