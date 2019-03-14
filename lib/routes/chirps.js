const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()

  .post('/')

  // delete route would use .findOneAndDelete({ _id: id, user: req.user.user_id });

  .get()

  .get();

  
