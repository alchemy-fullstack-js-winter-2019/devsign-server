const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweet => res.send(tweet))
      .catch(next);
  });
