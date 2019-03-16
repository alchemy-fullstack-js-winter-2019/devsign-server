const { Router } = require('express');
const User =  require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    User
      .create({ username, password })
      .then(user => res.json(user))
      .catch(next);
  });
