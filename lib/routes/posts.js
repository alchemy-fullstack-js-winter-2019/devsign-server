const { Router } = require('express');
const Post = require('../models/Post');


module.exports = Router()
  .get('/', (req, res, next) => {
    Post
      .find()
      .lean()
      .then(posts => res.send(posts))
      .catch(next);
  });
