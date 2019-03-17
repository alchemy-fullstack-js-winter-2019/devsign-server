const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/auth.js');

describe('auth routes', () => {
  beforeAll(() => connect());

  afterEach(() => mongoose.connection.dropDatabase());

  afterAll(done => mongoose.connection.close(done));

  it('signs up a user', () => {
    return request(app)
      .post('/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: 'shabster',
        password: 'passit'
      })
      .then(res => expect(res.body).toEqual({
        username: 'shabster',
        password: 'passit',
        _id: expect.any(String),
        __v: 0
      }));
  });

  it('signs in a user', () => {
    return request(app)
      .post('/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: 'shabster',
        password: 'passit'
      })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .set('Content-Type', 'application/json')
          .send({
            username: 'shabster',
            password: 'passit'
          })
          .then(res => expect(res.body).toEqual([{
            username: 'shabster',
            password: 'passit',
            _id: expect.any(String),
            __v: 0
          }]));
      });
  });
});
