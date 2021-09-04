const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../utils/config');

const login = async (req, res) => {
  const body = req.body;

  const findUser = await User.findOne({ username: body.username });

  const passwordCorrect =
    findUser === null
      ? false
      : await bcrypt.compare(body.password, findUser.password);
  if (!(findUser && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
  const userForToken = {
    username: findUser.username,
    id: findUser.id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET);
  res
    .status(200)
    .send({ token, username: findUser.username, name: findUser.name });
};
module.exports = {
  login,
};
