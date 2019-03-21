const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  tweetText: {
    type: String,
    required: [true, 'Text required']
  },
  user: {
    type: String
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);
