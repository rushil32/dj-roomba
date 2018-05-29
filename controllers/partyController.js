const Party = require('../models/Party');

const userCtrl = require('./userController');

exports.create = (req, res) => {
  const { title, description, host } = req.body;
  const newParty = new Party({
    title,
    description,
    host,
  });

  newParty.save((err, party) => {
    userCtrl.updateUserParty(host, party._id);
    res.send(party);
  });
};

exports.getParty = (req, res) => {
  const { partyId } = req.params;

  Party
    .findOne({ _id: partyId })
    .exec((err, party) => {
      res.send(party);
    });
};

exports.getAll = (req, res) => {
  Party
    .find({})
    .populate('host')
    .exec((err, parties) => {
      res.send(parties);
    });
};

exports.toggleVote = (req, res) => {
  const { partyId, trackId } = req.body;

  Party.findOne(
    { _id: partyId },
    'tracks',
    (err, party) => {
      const updatedParty = party;
      const trackIndex = party.tracks.findIndex(track => track.trackId === trackId);
      const { votes } = party.tracks[trackIndex];
      const userIp = req.connection.remoteAddress;

      if (votes.indexOf(userIp) > -1) {
        updatedParty.tracks[trackIndex].votes = votes.filter(vote => vote !== userIp);
      } else {
        updatedParty.tracks[trackIndex].votes.push(userIp);
      }

      updatedParty.save();
      res.send(updatedParty);
    },
  );
};

exports.addTrack = (req, res) => {
  const {
    trackId,
    name,
    artist,
    album,
    image,
    trackUrl,
    previewUrl,
    duration,
  } = req.body.trackData;

  Party.findOneAndUpdate(
    { _id: req.body.partyId },
    {
      $push: {
        tracks: {
          trackId,
          name,
          artist,
          album,
          image,
          trackUrl,
          previewUrl,
          duration,
        },
      },
    },
    { new: true },
    (err, party) => res.send(party),
  );
};

exports.removeTrack = (req, res) => {
  const { trackId, partyId } = req.body;
  Party
    .findOne({ _id: partyId })
    .exec((err, party) => {
      party.tracks.id(trackId).remove();
      party.save();
      res.send(party);
    });
};

exports.delete = (req, res) => {
  const { partyId } = req.params;

  Party.deleteOne({ _id: partyId }, (err, party) => {
    if (err) { res.send(500); return; }
    res.send(party);
  });
};
