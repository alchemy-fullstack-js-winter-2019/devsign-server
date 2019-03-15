require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const Chirp = require('../lib/models/Chirp');
const User = require('../lib/models/User');

describe('chirps routes', () => {
  beforeEach(done => mongoose.connection.dropDatabase((done())));
  afterAll(done => mongoose.connection.close(done()));

  const createUser = (name = 'name', handle = 'handle', profileImage ='imageUrl', bio = 'bio', location = 'location') => {
    return User.create({ name, handle, profileImage, bio, location })
    .then(user => {
      return { ...user, _id: user._id.toString() };
    });
  };

  const createChirp = (handle, text = 'some text') => {
    return createUser(handle)
      .then(user => {
        return Chirp.create({ handle: user._id, text })
        .then(chirp => ({ ...chirp, _id: chirp._id.toString() }))
      });
  };

  it('creates a new chirp', () => {
    return createUser()
      .then(createdUser => {
        return request(app)
        .post('/chirps')
        .send({
          handle: createdUser._id,
          text: 'my first chirp'
        })
        .then(res => {
          expect(res.body).toEqual({
            handle: expect.any(String),
            text: 'my first chirp',
            _id: expect.any(String),
            __v: 0
          });
        });
      });
  });
});
