require('dotenv').config();
require('../../lib/utils/connect')();
const seedData = require('../seedData.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

describe('hums route', () => {
  beforeEach(() => {
    return seedData(100);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('can get a list of hums', () => {
    return request(app)
      .get('/hums')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });

  it('can post a hum', () => {
    return request(app)
      .post('/hums')
      .send({
        hum: 'this is my hum'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          user: '1234',
          _id: expect.any(String),
          hum: 'this is my hum'
        });
      });
  });
});
