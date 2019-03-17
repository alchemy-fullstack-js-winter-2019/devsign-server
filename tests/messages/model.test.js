require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const Message = require('../../lib/models/Message');

describe('message model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => {
    const message = new Message ({
      sender: 'T_on_A',
      receiver: 'TT',
      text: 'message'
    });
    expect(message.toJSON()).toEqual({
      _id: expect.any(Object),
      sender: 'T_on_A',
      receiver: 'TT',
      text: 'message'
    });
  });
});
