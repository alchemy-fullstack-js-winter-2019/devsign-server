const { Router } = require('express');
const Hum = require('../models/Hum.js');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { hum } = req.body;
    Hum
      .create({ hum, user: req.user.user_id })
      .then(hum => res.send(hum))
      .catch(next);
  })
  .get('/', ensureAuth(), (req, res, next) => {
    Hum
      .find()
      .lean()
      .then(hums => populateUsers(hums))
      .then(hums => res.send(hums))
      .catch(next);
  });
