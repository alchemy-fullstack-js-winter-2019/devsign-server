const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Tweet =  mongoose.model('Tweet', tweetSchema);

module.export = Tweet;
