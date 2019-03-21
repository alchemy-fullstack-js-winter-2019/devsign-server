require('dotenv').config();
require('../../lib/utils/connect')();
const seedData = require('../seedData.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Hum = require('../../lib/models/Hum');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

const createHums = (user) => {
  return Hum.create({ user, hum: 'tweet chirp hum' })
    .then(createdHum => ({ ...createdHum }));
};

describe('hums route', () => {
  beforeEach(() => {
    return seedData(100);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(done => {
    return mongoose.disconnect(done);
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

  it('can delete a hum by id', () => {
    return request(app)
      .post('/hums')
      .send({
        hum: 'this is my hum'
      })
      .then(res => {
        return request(app)
          .delete(`/hums/${res.body._id}`)
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

  it('can get all hums created by a specific user', () => {
    const humsToCreate = ['1234', '1234', '1224'];
    return Promise.all(humsToCreate.map(createHums))
      .then(() => {
        return request(app)
          .get('/hums/users/1234')
          .then(res => {
            expect(res.body).toEqual([
              { '__v': 0, '_id': expect.any(String), 'hum': 'tweet chirp hum', 'user': '1234' }, 
              { '__v': 0, '_id': expect.any(String), 'hum': 'tweet chirp hum', 'user': '1234' }
            ]);
          });
      });
  });
});
