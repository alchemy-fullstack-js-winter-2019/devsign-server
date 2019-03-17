require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
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
      user: 'T_on_A',
      text: 'first tweet'
    });
    expect(tweet.toJSON()).toEqual({
      _id: expect.any(Object),
      user: 'T_on_A',
      text: 'first tweet'
    });
  });
});
