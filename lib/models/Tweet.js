const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
