require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('./seedData');

const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/auth.js');

describe('tweets routes', () => {
  beforeEach(() => {
    return seedData(100);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        text: 'Hello Tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          user: '123456',
          _id: expect.any(String),
          text: 'Hello Tweet'
        });
      });
  });

  it('can get a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => res.body)
      .then(tweets => {
        expect(tweets).toHaveLength(100);
      });
  });

  it('deletes a tweet by id', () => {
    return request(app)
      .post('/tweets')
      .send({
        text: 'Goodbye tweet'
      })
      .then(res => {
        return request(app)
          .delete(`/tweets/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              __v: 0,
              user: '123456',
              _id: expect.any(String),
              text: 'Goodbye tweet'
            });
          });
      });
  });
});
