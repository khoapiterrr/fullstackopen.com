const router = require('express').Router();
const userModel = require('../models/user');
const blogModel = require('../models/blog');
router
  .route('/testing/reset')
  // login
  .post(async (req, res) => {
    await userModel.deleteMany({});
    await blogModel.deleteMany({});
    res.status(204).end();
  });

module.exports = router;
