const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const User = require('../models/User');

module.exports = Router()
  .get('/:username', ensureAuth(), (req, res, next) => {
    User
      .find({ username: req.params.username })
      .lean()
      .then(user => res.send(user))
      .catch(next);
  });
