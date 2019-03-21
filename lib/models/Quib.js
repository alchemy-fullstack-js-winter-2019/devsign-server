const mongoose = require('mongoose');

const quibSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Quib =  mongoose.model('Quib', quibSchema);

module.exports = Quib;
