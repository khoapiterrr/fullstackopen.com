const router = require('express').Router();
const blogCtrl = require('../controllers/blog');
const authMiddleware = require('../middlewares/auth');
router
  .route('/blogs')
  // get all blog entries from database
  .get(blogCtrl.getAll)
  // add blog entries to the database
  .post(authMiddleware, blogCtrl.create);

router
  .route('/blogs/:id')
  // get blog by Id from database
  .get(blogCtrl.getById)
  // update blog by Id from database
  .put(blogCtrl.updateById)
  // delete blog by Id from database
  .delete(authMiddleware, blogCtrl.DeleteById);

module.exports = router;
