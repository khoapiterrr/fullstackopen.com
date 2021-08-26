const app = require('../index');
const mongoose = require('mongoose');
const userModel = require('../models/user');
const supertest = require('supertest');
const api = supertest(app);

beforeEach(async () => {
  await userModel.deleteMany({});
}, 30000);
describe('POST /api/blogs', () => {
  test('create new user with clear data', async () => {
    const newUser = {
      password: '112312321312',
      username: 'fullstack',
      name: 'khoapiterrr',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(newUser.name).toBe(result.body.name);
    expect(newUser.username).toBe(result.body.username);
  });

  test(`create new user with dirty data`, async () => {
    const newUser = {
      username: 'fullstack',
      name: 'khoapiterrr',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
