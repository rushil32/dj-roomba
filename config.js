module.exports = {
  tokenSecret: 'supersecret',
  dbUrl: 'mongodb://rushil:thirdeye@ds231090.mlab.com:31090/dj-roomba',
  spotify: {
    clientId: '4450915fbb874a0bbb5699e076955afd',
    secret: 'ac4566482fd94815aff2af06035d8007',
    scope: ''
      + 'user-top-read '
      + 'user-read-private '
      + 'user-read-email '
      + 'playlist-read-private '
      + 'playlist-read-collaborative '
      + 'playlist-modify-public '
      + 'playlist-modify-private',
    redirectUri: 'https://dj-rooomba.herokuapp.com/',
    token: '',
    tokenRefreshTime: '',
  },
};
