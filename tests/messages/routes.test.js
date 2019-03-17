require('dotenv').config();
require('../../lib/utils/connect')();

const app = require('../../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');
const { seedDataMessage } = require('../seedData');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

const createMessage = () => {
  return request(app)
    .post('/messages')
    .send({
      sender: 'T_A',
      receiver: 'TT',
      text: 'trying'
    })
    .then(res => res.body);
};

describe('message routes', () => {
  beforeEach(() => {
    return seedDataMessage(100);
  });
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  it('can get a list of messages', () => {
    return request(app)
      .get('/messages')
      .then(res => res.body)
      .then(messages => {
        expect(messages).toHaveLength(100);
      });
  });
  it('can post a message', () => {
    return request(app)
      .post('/messages')
      .send({
        sender: 'T_A',
        receiver: 'TT',
        text: 'trying'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          sender: expect.any(String),
          receiver: expect.any(String),
          text: 'trying',
          __v: 0
        });
      });
  });
  it('can delete a message', () => {
    return createMessage()
      .then(createdMessage => {
        return request(app)
          .delete(`/messages/${createdMessage._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          sender: expect.any(String),
          receiver: expect.any(String),
          __v: 0,
          text: 'trying'
        });
      });

  });
});
