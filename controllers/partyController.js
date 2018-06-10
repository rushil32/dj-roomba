const Party = require('../models/Party');
const { shuffle } = require('../helpers/util');

const { ObjectId } = require('mongoose').Types;

exports.create = (req, res) => {
  const { title, host } = req.body;
  const newParty = new Party({
    title,
    host,
  });

  newParty.save((err, party) => {
    res.send(party);
  });
};

exports.getParty = (req, res) => {
  const { partyId } = req.params;

  Party
    .findOne({ _id: partyId })
    .populate('host')
    .populate('guests')
    .exec((err, party) => {
      res.send(party);
    });
};

exports.getUserList = (req, res) => {
  const { userId } = req.params;

  Party
    .find({ host: userId })
    .exec((err, parties) => {
      res.send(parties);
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

function getTrackData(userId, tracks) {
  return tracks.map(track => ({
    owner: new ObjectId(userId),
    trackId: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    image: track.album.images[0].url,
    trackUrl: track.uri,
    previewUrl: track.preview_url,
    duration: track.duration_ms,
  }));
}

exports.addTracks = (req, res) => {
  const { userId, partyId } = req.body;
  const tracks = getTrackData(userId, req.body.tracks);

  Party
    .findOneAndUpdate(
      { _id: partyId },
      { $push: { tracks: { $each: tracks }, guests: new ObjectId(userId) } },
      { new: true },
    )
    .populate('host')
    .populate(['guests'])
    .exec((err, party) => res.send(party));
};


exports.shuffleTracks = (req, res) => {
  const { partyId } = req.params;

  Party
    .findOne({ _id: partyId })
    .populate('host')
    .populate(['guests'])
    .exec((err, party) => {
      party.tracks = shuffle(party.tracks);
      party.save();
      res.send(party);
    });
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
