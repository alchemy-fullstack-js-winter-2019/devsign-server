require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('./seedData');

const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/auth.js');
jest.mock('../lib/middleware/ensureAuth.js');

describe('tweets routes', () => {
  beforeEach(() => {
    return seedData(100);
  });

  afterEach(done => {
    mongoose.connection.close(done);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
 
  it('can get a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => expect(res.body).toHaveLength(300));
  });
});
