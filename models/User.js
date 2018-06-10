const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyId: String,
  email: String,
  name: String,
  image: String,
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
