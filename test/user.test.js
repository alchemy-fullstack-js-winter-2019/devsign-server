require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const seedData = require('./seedData');
const User = require('../lib/models/User');

jest.mock('../lib/middleware/ensureAuth');
jest.mock('../lib/services/auth.js');

const createUser = (name, handle = 'handle', profileImage = 'image', bio = 'bio', location = 'location') => {
  return User.create({ name, handle, profileImage, bio, location });
} 

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

  // it('gets all user by id', () => {
  //   return Promise.all(['ughugh'].map(user => createUser(user)))
  //   .then(user => {
  //     return request(app)
  //     .get(`/users/${user._id}`)
  //   })
  //     .then(res => res.body)
  //     .then(users => {
  //       expect(users).toEqual({
  //         name: 'ughugh',
  //         handle: 'handle',
  //         profileImage: 'imageURL',
  //         bio: 'bio',
  //         location: 'location',
  //         _id: expect.any(String),
  //         __v: 0
  //       });
  //   });
  // });

});
