require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('./seedData');

const request = require('supertest');
const app = require('../lib/app');


jest.mock('../lib/services/auth.js');
jest.mock('../lib/middleware/ensureAuth.js');

describe('tweets routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase((done()));
  });

  beforeEach(() => {
    return seedData();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
 
  it('can get a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => expect(res.body).toHaveLength(100));
  });

  it('can post a tweet', () => {
    return request (app)
      .post('/tweets')
      .send({ text: 'Testing' })
      .then(res => {
        expect(res.body).toEqual({
          user: '1234',
          text: 'Testing',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can delete a tweet by user id', () => {
    return request(app)
      .post('/tweets')
      .send({ text: 'Testing' })
      .then(res => {
        return request(app)
          .delete(`/tweets/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              user: '1234',
              text: 'Testing',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});
