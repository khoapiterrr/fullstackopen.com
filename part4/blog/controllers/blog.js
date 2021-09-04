const Blog = require('../models/blog');

const getAll = async (req, res) => {
  const docs = await Blog.find({}).populate('user', '-blogs');
  res.status(200).json(docs).end();
};

const create = async (req, res) => {
  const { user } = req;
  req.body.user = user.id;
  const blog = new Blog(req.body);
  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);

  await user.save();
  res.status(201).json(result).end();
};

const getById = async (req, res) => {
  const { id } = req.params || {};
  const doc = await Blog.findById(id);
  if (!doc) {
    res.status(404).json('Not found').end();
  }
  res.status(200).json(doc).end();
};
const DeleteById = async (req, res) => {
  const { user } = req;
  const { id } = req.params || {};
  const doc = await Blog.findById(id);
  if (!doc) {
    res.status(404).json('Not found').end();
  }
  if (doc.user.toString() === user.id.toString()) {
    await doc.remove();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
  res.status(200).json(doc).end();
};

const updateById = async (req, res) => {
  const { id } = req.params || {};
  const doc = await Blog.findByIdAndUpdate(id.toString(), req.body, {
    new: true,
  }).populate('user', '-blogs');
  if (!doc) {
    res.status(404).json('Not found').end();
  }
  res.status(200).json(doc).end();
};
module.exports = {
  getAll,
  create,
  getById,
  DeleteById,
  updateById,
};
