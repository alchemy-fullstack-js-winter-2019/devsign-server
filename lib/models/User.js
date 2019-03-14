const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  handle: String,
  profileImage: String,
  password: String,
  Bio: String,
  location: String
});

module.exports = mongoose.model('User', userSchema);
