const mongoose = require('mongoose');

const chirpSchema = new mongoose.Schema({
  handle: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    maxLength: 280
  }
});

module.exports = mongoose.model('Chirp', chirpSchema);
