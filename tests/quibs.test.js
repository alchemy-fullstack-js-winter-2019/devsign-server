require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('./seedData');

const request = require('supertest');
const app = require('../lib/app');

describe('quibs routes', () => {
  beforeEach(() => {
    return seedData(20);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  it('can get a list of quibs', () => {
    return request(app)
      .get('/quibs')
      .then(res => res.body)
      .then(quibs => {
        expect(quibs).toHaveLength(20);
      });
  });
});
