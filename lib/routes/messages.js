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
  })
  .post('/', ensureAuth(), (req, res, next) => {
    const { text, receiver } = req.body;
    Message 
      .create({
        text,
        sender: req.user.user_id,
        receiver
      })
      .then(message => res.json(message))
      .catch(next);
  })
  .delete('/:id', ensureAuth(), (req, res, next) => {
    const { id } = req.params;
    Message 
      .findByIdAndDelete({ _id: id, sender: req.user.user_id, receiver: req.body.receiver })
      .then(deleted => res.send(deleted))
      .catch(next);
  });

