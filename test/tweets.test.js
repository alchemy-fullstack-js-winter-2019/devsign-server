require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/auth.js');

describe('tweets routes', () => {
  beforeAll(() => connect());

  beforeEach(() => seedData(15, 50));

  afterEach(() => mongoose.connection.dropDatabase());

  afterAll(done => mongoose.connection.close(done));

  it('gets a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => res.body)
      .then(tweets => expect(tweets).toHaveLength(50));
  });
});
