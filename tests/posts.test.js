require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('./seedData');

const request = require('supertest');
const app = require('../lib/app');

describe('posts routes', () => {
  beforeEach(() => {
    return seedData(10);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('can get a list of posts', () => {
    return request(app)
      .get('/posts')
      .then(res => res.body)
      .then(posts => {
        expect(posts).toHaveLength(10);
      });
  });
});
