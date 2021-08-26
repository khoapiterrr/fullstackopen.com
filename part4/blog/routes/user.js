const router = require('express').Router();
const userCtrl = require('../controllers/user');

router
  .route('/users')
  // get all blog entries from database
  .get(userCtrl.getAll)
  // add blog entries to the database
  .post(userCtrl.create);

router
  .route('/users/:id')
  // get blog by Id from database
  .get(userCtrl.getById)
  // update blog by Id from database
  .put(userCtrl.updateById)
  // delete blog by Id from database
  .delete(userCtrl.DeleteById);

module.exports = router;
