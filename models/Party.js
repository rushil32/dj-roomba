const mongoose = require('mongoose');

const { Schema } = mongoose;

const partySchema = new Schema({
  title: String,
  description: String,
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Party', partySchema);
