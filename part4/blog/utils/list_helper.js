var bcrypt = require('bcryptjs');
/* eslint-disable indent */
const _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const countLikes = blogs.reduce((total, item) => total + item.likes, 0);
  return countLikes;
};
const transformData = (data) => ({
  title: data.title,
  author: data.author,
  likes: data.likes,
});
const favoriteBlog = (blogs) => {
  const findFavoriteBlog = blogs?.reduce((preVal, current) => {
    return current?.likes <= preVal?.likes
      ? transformData(preVal)
      : transformData(current);
  }, null);

  return findFavoriteBlog;
};

const mostBlogs = (blogs) => {
  const findMostBlogs = _.countBy(blogs, 'author');
  const max = _.max(_.map(findMostBlogs, (e) => e));

  const author = _.findKey(findMostBlogs, (o) => o === max);

  return { author, blogs: max };
};

const mostLikes = (blogs) => {
  const findMostLike = _.reduce(
    blogs,
    (preVal, curVal) => {
      return {
        ...preVal,
        [curVal.author]: curVal.likes + (preVal[curVal.author] ?? 0),
      };
    },
    {},
  );
  const max = _.max(_.map(findMostLike, (e) => e));

  const author = _.findKey(findMostLike, (o) => o === max);

  return { author, likes: max };
};

const verifyPassword = (pwd, hash) => {
  return bcrypt.compare(pwd, hash);
};

const initialDb = {
  blogs: [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      user: '61277bb35b72102eb4581dd2',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      user: '61277bb35b72102eb4581dd2',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      user: '61277bb35b72102eb4581dd2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      user: '61277bb35b72102eb4581dd2',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      user: '61277bb35b72102eb4581dd2',
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      user: '61277bb35b72102eb4581dd2',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ],
  users: [
    {
      _id: '61277bb35b72102eb4581dd2',
      username: 'fullstack',
      password: '123123312',
      name: 'khoaPiterrrr',
      blogs: [
        '5a422a851b54a676234d17f7',
        '5a422aa71b54a676234d17f8',
        '5a422b3a1b54a676234d17f9',
        '5a422b891b54a676234d17fa',
        '5a422ba71b54a676234d17fb',
        '5a422bc61b54a676234d17fc',
      ],
      __v: 0,
    },
  ],
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  verifyPassword,
  initialDb,
};
