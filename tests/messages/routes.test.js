require('dotenv').config();
require('../../lib/utils/connect')();

const app = require('../../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');
const { seedDataMessage } = require('../seedData');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

describe('message routes', () => {
  beforeEach(() => {
    return seedDataMessage(100);
  });
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  it('can get a list of messages',() => {
    return request(app)
      .get('/messages')
      .then(res => res.body)
      .then(messages => {
        expect(messages).toHaveLength(100);
      });
  });
  // it('can post a message', () => {

  // })
});
