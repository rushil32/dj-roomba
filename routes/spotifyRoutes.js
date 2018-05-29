const express = require('express');
const spotifyCtrl = require('../controllers/spotifyController');

const router = express.Router();

router.get('/search/:query', spotifyCtrl.search);

module.exports = router;

