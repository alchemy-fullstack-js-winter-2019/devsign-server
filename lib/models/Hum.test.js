require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');
const Hum = require('./Hum');

describe('Hum Model', () => {
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(done => {
    return mongoose.disconnect(done);
  });
  it('validates a good model', () => {
    const hum = new Hum({
      hum: 'ugh'
    });

    expect(hum.toJSON()).toEqual({
      hum: 'ugh',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires a hum', () => {
    const hum = new Hum({});
    const errors = hum.validateSync().errors;
    expect(errors).toBeDefined();
  });
});
