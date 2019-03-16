const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User Id required']
  },
  tweetText: {
    type: String,
    required: [true, 'Text required']
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);
