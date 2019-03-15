require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const Chirp = require('../lib/models/Chirp');
const User = require('../lib/models/User');

jest.mock('../lib/middleware/ensureAuth');

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

  it('creates a new chirp', done => {
    return request(app)
    .post('/chirps')
    .send({
      text: 'my first chirp'
    })
    .then(res => {
      expect(res.body).toEqual({
        handle: expect.any(String),
        text: 'my first chirp',
        _id: expect.any(String),
        __v: 0
      });
      done();
    });
  });

  it('gets all the chirps', () => {
    return Promise.all([...Array(3)].map(el => createChirp(el)))
    .then(() => {
    return request(app)
    .get('/chirps')
    })
    .then(res => {
      expect(res.body).toHaveLength(3);
    });
  });
});
