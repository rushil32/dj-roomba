const express = require('express');

const partyCtrl = require('../controllers/partyController');

const router = express.Router();

router.get('/info/:partyId', partyCtrl.getParty);

router.get('/all', partyCtrl.getAll);

router.post('/new', partyCtrl.create);

router.put('/add-track', partyCtrl.addTrack);

router.put('/remove-track', partyCtrl.removeTrack);

router.put('/vote', partyCtrl.toggleVote);

router.delete('/:partyId', partyCtrl.delete);

module.exports = router;
