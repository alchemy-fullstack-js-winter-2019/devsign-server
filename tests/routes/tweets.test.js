require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('../seedData');

const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/services/auth.js');

describe('tweets routes', () => {
  beforeEach(() => {
    return seedData();
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  // it('can post a tweet', () => {
  //   const tweet = {
  //     user: 'test@test.com',
  //     text: 'blah blah'
  //   };
  //   return request(app)
  //     .post('/tweets')
  //     .send(tweet)
  //     .then(res => {
  //       console.log(res);
  //       expect(res.body).toEqual({
  //         tweet: {
  //           _id: expect.any(String),
  //           user: 'test@test.com',
  //           text: 'blah blah'
  //         }
  //       });
  //     });
  // });

  it('can get a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => res.body)
      .then(tweets => {
        expect(tweets).toHaveLength(1000);
      });
  });
});
