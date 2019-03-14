require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('tweet model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => {
    const tweet = new Tweet ({
      handle: 'T_on_A',
      text: 'first tweet'
    });
    expect(tweet.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      handle: 'T_on_A',
      text: 'first tweet'
    });
  });
}) 
