const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth')
const User = require('../models/User');

module.exports = Router()

.post('/', ensureAuth(), (req, res, next) => {
  const { name, handle, profileImage, bio, location } = req.body;
  User
    .create({ name, handle, profileImage, bio, location })
    .then(user => res.send(user))
    .catch(next);
})