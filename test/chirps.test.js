require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const seedData = require('./seedData');

jest.mock('../lib/middleware/ensureAuth');
jest.mock('../lib/services/auth.js');

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
    })
  });
});
