require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const seedData = require('./seedData');
const Chirp = require('../lib/models/Chirp');

jest.mock('../lib/middleware/ensureAuth');
jest.mock('../lib/services/auth.js');

const createChirp = (handle, text = 'some text') => {
  return Chirp.create({ handle, text })
} 

describe('chirps routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase((done()));
  });

  beforeEach(() => seedData());

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

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

  it('gets all the chirps', done => {
    return request(app)
    .get('/chirps')
    .then(res => res.body)
    .then(chirps => {
      expect(chirps).toHaveLength(100);
      done();
    });
  });

  it('gets all chirps by user_id', () => {
    return Promise.all(['1234', '1234', '1234', '1235', '1233'].map(chirp => createChirp(chirp)))
    .then(() => {
      return request(app)
      .get('/chirps/1234')
    })
      .then(res => res.body)
      .then(chirps => {
        expect(chirps).toHaveLength(3);
    });
  });

});
