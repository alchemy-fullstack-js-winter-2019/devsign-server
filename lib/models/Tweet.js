const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
