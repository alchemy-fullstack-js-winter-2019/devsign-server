const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

jest.mock('../lib/services/auth.js');

describe('users routes', () => {
  beforeAll(() => connect());

  beforeEach(done => {
    User
      .create({
        username: 'shabz',
        password: 'passit'
      })
      .then(() => done());
  });

  afterEach(() => mongoose.connection.dropDatabase());

  afterAll(done => mongoose.connection.close(done));

  it('gets a user by username', () => {
    return request(app)
      .get('/users/shabz')
      .then(res => expect(res.body).toEqual([{
        username: 'shabz',
        password: 'passit',
        _id: expect.any(String),
        __v: 0
      }]));
  });
});
