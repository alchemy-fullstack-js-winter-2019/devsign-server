const { Router } = require('express');
const Quib = require('../lib/models/Quib');
// const ensureAuth = require('../lib/middleware/ensureAuth');
const { populateUsers } = require('../lib/services/auth');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { body } = req.body;
    Quib 
      .create({ body, user: req.user.user_id })
      .then(quib => res.json(quib))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Quib
      .find()
      .lean()
      .then(quibs => populateUsers(quibs))
      .then(quibs => res.send(quibs))
      .catch(next);
  });
