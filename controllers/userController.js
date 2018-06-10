const authCtrl = require('./authController');
const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;

exports.createUser = ({ id, display_name, email, images }) =>
  new Promise((resolve, reject) => {
    User.findOne({ spotifyId: id })
      .populate('party')
      .exec((err, user) => {
        if (err) {
          reject(err);
          return;
        }
        if (user) {
          resolve(user);
          return;
        }

        const newUser = new User({
          spotifyId: id,
          email,
          name: display_name,
          image: images[0].url,
        });

        newUser.save();
        resolve(newUser);
      });
  });

exports.getSpotifyUser = id =>
  new Promise((resolve, reject) => {
    User.findOne({ spotifyId: id })
      .populate('party')
      .exec((err, user) => {
        if (err || !user) resolve({});
        resolve(user);
      });
  });

exports.getUser = id =>
  new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .populate('party')
      .exec((err, user) => {
        resolve(user);
      });
  });

exports.updateUserParty = (userId, partyId) =>
  new Promise((resolve, reject) => {
    User.update({ _id: userId }, {
      party: new ObjectId(partyId),
    }, (err, numberUpdated) => {
      console.log(numberUpdated);
    });
  });

exports.getData = (req, res) => {
  const { token } = req.cookies;
  const userId = authCtrl.verifyToken(token);

  if (!userId) {
    res.status(403).send('Unauthorized user');
    return;
  }

  this.getUser(userId).then(user => res.send({ user }));
};
