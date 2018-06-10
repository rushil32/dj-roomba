const express = require('express');

const authCtrl = require('../controllers/authController');

const router = express.Router();

router.get('/spotify-auth', authCtrl.spotifyAuth);

router.get('/info', authCtrl.getUserInfo);

router.post('/spotify-login', authCtrl.spotifyLogin);

module.exports = router;
