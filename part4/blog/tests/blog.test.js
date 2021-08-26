const app = require('../index');
const mongoose = require('mongoose');
const blogModel = require('../models/blog');
const userModel = require('../models/user');
const helpers = require('../utils/list_helper');
const config = require('../utils/config');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

let token = jwt.sign(
  {
    id: '61277bb35b72102eb4581dd2',
    username: 'fullstack',
  },
  config.JWT_SECRET,
);

beforeEach(async () => {
  await blogModel.deleteMany({});
  await userModel.deleteMany({});
  await blogModel.insertMany(helpers.initialDb.blogs);
  await userModel.insertMany(helpers.initialDb.users);
  token = await token;
}, 30000);
const api = supertest(app);
describe('GET /api/blogs', () => {
  const result = api.get('/api/blogs');
  test('call api to check status and content-type', async () =>
    await result.expect(200).expect('Content-Type', /application\/json/));
  test('get blog data from api to equal blog data json', () => {
    result.then((response) => {
      console.log(response.body[0], 'res');
      expect(response.body).toContainEqual({
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: {
          username: 'fullstack',
          name: 'khoaPiterrrr',
          id: '61277bb35b72102eb4581dd2',
        },
      });
    });
  });

  test('Check the unique identifier property of the blog posts is named id', () => {
    result.then((response) => {
      expect(response.body[0]?.id).toBeDefined();
    });
  });
});

describe('POST /api/blogs', () => {
  test('the /api/blogs url successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'Learn test api fullstack',
      author: 'fullstack',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
      likes: 100,
    };

    const countDocsBeforeCreate = await blogModel.countDocuments();
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);
    // expect(result.body).toContainEqual(newBlog);

    const countDocsAfterCreate = await blogModel.countDocuments();
    expect(countDocsAfterCreate).toBe(countDocsBeforeCreate + 1);
  });

  test(`When the object don't exist likes property from request, it will default to the value 0`, async () => {
    const newBlogMissingLike = {
      title: 'Learn test api fullstack1',
      author: 'fullstack1',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogMissingLike)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);
    console.log(result.body, 'hjeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(result.body.likes).toBe(0);
  });

  test(`When the object missing `, async () => {
    const newBlogMissingValue = {
      author: 'fullstack',
      likes: 10,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogMissingValue)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('DELETED /api/blogs/5a422a851b54a676234d17f7', () => {
  test('Delete blog with id 5a422a851b54a676234d17f7', async () => {
    const blogsAtStart = await blogModel.countDocuments();
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const blogsAtEnd = await blogModel.countDocuments();
    expect(blogsAtEnd).toBe(blogsAtStart - 1);
  });

  test('Delete blog with id failed ', async () => {
    await api
      .delete('/api/blogs/123123')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('Update /api/blogs/5a422aa71b54a676234d17f8', () => {
  test('Update blog with id 5a422aa71b54a676234d17f8', async () => {
    const data = {
      id: '5a422aa71b54a676234d17f8',
      title: 'NodeJs Jest',
      author: 'Khoapiterrr',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1000,
    };

    const result = await api
      .put(`/api/blogs/${data.id}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(200);

    expect(result.body).toEqual(data);
  });

  test('Update blog with id failed ', async () => {
    await api.put('/api/blogs/123123').expect(400);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
