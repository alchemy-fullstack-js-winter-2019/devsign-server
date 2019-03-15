const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    Chirp
      .create({ ...req.body })
      .then(chirp => {
        res.send(chirp);
      })
      .catch(next);
  });

  // delete route would use .findOneAndDelete({ _id: id, user: req.user.user_id });

  // .get()

  // .get();

  
