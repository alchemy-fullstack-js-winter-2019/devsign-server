require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('../seedData');

const request = require('supertest');
const app = require('../../lib/app');

describe('tweets routes', () => {
  beforeEach(() => {
    return seedData();
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can get a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => res.body)
      .then(tweets => {
        expect(tweets).toHaveLength(1000);
      });
  });
});
