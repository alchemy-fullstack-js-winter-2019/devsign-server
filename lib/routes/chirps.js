const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    console.log('text', req.body.text);
    const { text } = req.body;
    Chirp
      .create({ text, handle: req.user.user_id })
      .then(chirp => res.send(chirp))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Chirp
      .find()
      .select({ __v: false, _id: false })
      .then(chirps => res.send(chirps))
      .catch(next);
  });

  // .get();

  

  // delete route would use .findOneAndDelete({ _id: id, user: req.user.user_id });