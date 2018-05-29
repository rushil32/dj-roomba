import axios from 'axios';

export function getUserInfo(cb) {
  axios.get('/api/users/current').then(
    res => cb(res.data.user),
    error => console.error,
  );
}
