const mongoose = require('mongoose');

const humSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  hum: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Hum', humSchema);
