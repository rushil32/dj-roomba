const mongoose = require('mongoose');

const { Schema } = mongoose;

const trackSchema = new Schema({
  name: String,
  artist: String,
  trackId: String,
  votes: [String],
  image: String,
  album: String,
  trackUrl: String,
  previewUrl: String,
  duration: Number,
});

const partySchema = new Schema({
  title: String,
  description: String,
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  private: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  tracks: [trackSchema],
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Party', partySchema);
