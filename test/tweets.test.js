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

  it('posts a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        tweetText: 'I am a twit face',
        user: 'auth1'
      })
      .set('Content-Type', 'application/json')
      .then(res => expect(res.body).toEqual({
        tweetText: 'I am a twit face',
        user: 'auth1',
        _id: expect.any(String),
        __v: 0
      }));
  });
});
