const User = require('../models/user');
const bcrypt = require('bcryptjs');
const getAll = async (req, res) => {
  const docs = await User.find({}).populate('blogs');
  res.status(200).json(docs).end();
};

const create = async (req, res) => {
  const user = new User(req.body);

  const { password } = user;
  if (!password || password?.length < 3) {
    console.log('err hehehehh');
    throw new Error('Password missing');
  }
  // hash password
  var salt = bcrypt.genSaltSync(10);
  const pwdHash = await bcrypt.hash(password, salt);
  user.password = pwdHash;
  const result = await user.save();
  res.status(201).json(result).end();
};

const getById = async (req, res) => {
  const { id } = req.params || {};
  const doc = await User.findById(id);
  if (!doc) {
    res.status(404).json('Not found').end();
  }
  res.status(200).json(doc).end();
};
const DeleteById = async (req, res) => {
  const { id } = req.params || {};
  const doc = await User.findByIdAndRemove(id);
  if (!doc) {
    res.status(404).json('Not found').end();
  }
  res.status(200).json(doc).end();
};

const updateById = async (req, res) => {
  const { id } = req.params || {};
  const doc = await User.findByIdAndUpdate(id.toString(), req.body, {
    new: true,
  });

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
