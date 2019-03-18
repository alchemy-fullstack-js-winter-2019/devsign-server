const { Router } = require('express');
const Tweet = require('../lib/models/Tweet');
// const ensureAuth = require('../lib/middleware/ensureAuth');
const { populateUsers } = require('../lib/services/auth');

module.exports = Router()
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .lean()
      .then(tweets => populateUsers(tweets))
      .then(tweets => res.send(tweets))
      .catch(next);
  });
