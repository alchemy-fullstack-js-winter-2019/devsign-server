const { Router } = require('express');
const Message = require('../models/Message');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Message
      .find()
      .lean()
      .then(messages => populateUsers(messages))
      .then(messages => res.send(messages))
      .catch(next);
  });
