require('dotenv').config();
require('../../lib/utils/connect')();
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const seedData = require('../seedData');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet', () => {
  beforeEach(() => {
    return seedData();
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => {
    const tweet = new Tweet({
      user: 'booboo3000',
      text: 'hi hi hi'
    });
    expect(tweet.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      user: 'booboo3000',
      text: 'hi hi hi'
    });
  });

  it('has required user and text fields', done => {
    const tweet = new Tweet({});
    const errors = tweet.validateSync().errors;
    expect(errors).toBeDefined();
    expect(errors.user['message']).toEqual('Path `user` is required.');
    expect(errors.text['message']).toEqual('Path `text` is required.');
    done();
  });

});
