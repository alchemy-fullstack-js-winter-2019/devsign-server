require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const seedData = require('./seedData');

jest.mock('../lib/middleware/ensureAuth');
jest.mock('../lib/services/auth.js');

// const createUser = (name, handle = 'handle', profileImage = 'image', bio = 'bio', location = 'location') => {
//   return Chirp.create({ name, handle, profileImage, bio, location });
// } 

describe('users routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase((done()));
  });

  beforeEach(() => seedData());

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('creates a new user', done => {
    return request(app)
    .post('/users')
    .send({
      name: 'name',
      handle: 'handle',
      profileImage: 'imageURL',
      bio: 'bio',
      location: 'location'
    })
    .then(res => {
      expect(res.body).toEqual({
        name: 'name',
        handle: 'handle',
        profileImage: 'imageURL',
        bio: 'bio',
        location: 'location',
        _id: expect.any(String),
        __v: 0
      });
      done();
    });
  });

  // it('gets all chirps by user_id', () => {
  //   return Promise.all(['1234', '1234', '1234', '1235', '1233'].map(chirp => createChirp(chirp)))
  //   .then(() => {
  //     return request(app)
  //     .get('/chirps/1234')
  //   })
  //     .then(res => res.body)
  //     .then(chirps => {
  //       expect(chirps).toHaveLength(3);
  //   });
  // });

});
