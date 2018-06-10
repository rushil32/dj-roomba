const mongoose = require('mongoose');

const { Schema } = mongoose;

const trackSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  revealed: { type: Boolean, default: false },
  trackId: String,
  name: String,
  artist: String,
  album: String,
  image: String,
  trackUrl: String,
  previewUrl: String,
  duration: Number,
});

const partySchema = new Schema({
  title: String,
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true },
  tracks: [trackSchema],
  guests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Party', partySchema);
