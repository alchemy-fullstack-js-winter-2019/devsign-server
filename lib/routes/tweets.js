const { Router } = require('express');
const Tweet = require('../models/Tweet');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');


module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { text } = req.body;
    Tweet
      .create({ text, user: req.user.user_id })
      .then(tweet => res.json(tweet))
      .catch(next);
     
  })
  .get('/', ensureAuth(), (req, res, next) => {
    Tweet
      .find()
      .lean()
      .then(tweets => populateUsers(tweets))
      .then(tweets => res.send(tweets))
      .catch(next);
  });

