const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const authMiddleware = async (req, res, next) => {
  const authorization =
    req.headers['Authorization'] || req.headers['authorization'];
  try {
    if (authorization && authorization.match(/^Bearer /g)) {
      const token = authorization.split(' ')[1];
      const secret = config.JWT_SECRET;
      const verificationResponse = await jwt.verify(token, secret);
      const userId = verificationResponse.id;
      const findUser = await userModel.findById(userId);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        res.status(401).json({ error: 'Wrong authentication token' }).end();
      }
    } else {
      res.status(401).json({ error: 'Authentication token missing' }).end();
    }
  } catch (err) {
    res.status(401).json({ error: 'Authentication token missing' }).end();
  }
};
module.exports = authMiddleware;
