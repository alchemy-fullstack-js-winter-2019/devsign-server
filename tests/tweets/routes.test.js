require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('../seedData');
const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/services/auth.js');

const createTweet = () => {
  return request(app)
    .post('/tweets')
    .send({
      user: 'auth0|5c8999089c0ac45b5d211df3',
      text: 'teewt'
    })
    .then(res => res.body);
};
describe('tweet routes', () => {
  beforeEach(() => {
    return seedData(1000);
  });
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('can get a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => res.body)
      .then(tweets => {
        expect(tweets).toHaveLength(1000);
      });
  });

  it('can post a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        user: 'auth0|5c8999089c0ac45b5d211df3',
        text: 'teewt'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          text: 'teewt',
          __v: 0
        });
      });
  });

  it('can delete a tweet', () => {
    return createTweet()
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: 'auth0|5c8999089c0ac45b5d211df3',
          text: 'teewt'
        });
      });

  });
});
