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
      .then(results => res.send(results))
      .catch(next);
  });
