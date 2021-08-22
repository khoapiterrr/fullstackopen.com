const Blog = require('../models/blog');

const getAll = async (req, res, next) => {
  try {
    const docs = await Blog.find({});
    res.status(200).json(docs).end();
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
      res.status(201).json(result).end();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAll,
  create,
};
