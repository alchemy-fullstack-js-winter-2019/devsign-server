const { Router } = require('express');
const Tweet = require('../models/Tweet');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Tweet
      .find()
      .lean()
      .then(tweets => populateUsers(tweets))
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .delete('/:id', ensureAuth(), (req, res, next) => {
    const { id } = req.params;

    Tweet
      .findOneAndDelete({ _id: id, user: req.user.user_id })
      .then(deleted => res.send(deleted))
      .catch(next);
  });
