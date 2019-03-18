const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');
const Chirp = require('../models/Chirp');

module.exports = Router()

  .post('/', ensureAuth(), (req, res, next) => {
    const { text } = req.body;
    Chirp
      .create({ text, handle: req.user.user_id })
      .then(chirp => res.send(chirp))
      .catch(next);
  })

  .get('/', ensureAuth(), (req, res, next) => {
    Chirp
      .find()
      .lean()
      .then(chirps => populateUsers(chirps))
      .then(chirps => res.send(chirps))
      .catch(next);
  })

  .get('/:id', ensureAuth(), (req, res, next) => {
    Chirp
      .find({ handle: req.params.id })
      .lean()
      .then(chirps => res.send(chirps))
      .catch(next);
  });
  
  // delete route would use .findOneAndDelete({ _id: id, user: req.user.user_id });
