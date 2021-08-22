const router = require('express').Router();
const blogCtrl = require('../controllers/blog');

router
  .route('/blogs')
  // get all blog entries from database
  .get(blogCtrl.getAll)
  // add blog entries to the database
  .post(blogCtrl.create);

module.exports = router;
