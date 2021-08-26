const listHelper = require('../utils/list_helper');
const bigListBlogs = require('../initializeBlog.json');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(bigListBlogs);
    expect(result).toBe(36);
  });
});

describe('Find blog has most likes', () => {
  test('of a bigger list', () => {
    const result = listHelper.favoriteBlog(bigListBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});
describe('Find author who has the largest amount of blogs', () => {
  test('Of a bigger list', () => {
    const result = listHelper.mostBlogs(bigListBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('Find author whose blog posts have the largest amount of likes', () => {
  test('Of a bigger list', () => {
    const result = listHelper.mostLikes(bigListBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
