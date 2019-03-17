const { Router } = require('express');
const User =  require('../models/User');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    User
      .create({ username, password })
      .then(user => res.json(user))
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { username, password } = req.body;

    User
      .find({ username, password })
      .then(user => {
        user ? res.send(user) : next(new HttpError(401, 'Bad email or password'));
      })
      .catch(next);
  })

  .get('/', (req, res) => {
    res.send('Sign In!!');
  });
