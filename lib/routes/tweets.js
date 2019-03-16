const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Tweet
      .find()
      .lean()
      .then(tweets => populateUsers(tweets))
      .then(results => res.send(results))
      .catch(next);
  })

  .post('/', ensureAuth(), (req, res, next) => {
    const { tweetText, user } = req.body;
    Tweet
      .create({ tweetText, user })
      .then(tweet => res.json(tweet))
      .catch(next);
  });
