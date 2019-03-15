const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  handle: String,
  profileImage: String,
  bio: String,
  location: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
