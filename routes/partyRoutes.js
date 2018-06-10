const express = require('express');

const partyCtrl = require('../controllers/partyController');

const router = express.Router();

router.get('/info/:partyId', partyCtrl.getParty);

router.get('/user/:userId', partyCtrl.getUserList);

router.get('/shuffle/:partyId', partyCtrl.shuffleTracks);

router.post('/new', partyCtrl.create);

router.put('/add-tracks', partyCtrl.addTracks);

router.put('/remove-track', partyCtrl.removeTrack);

router.delete('/:partyId', partyCtrl.delete);

module.exports = router;
