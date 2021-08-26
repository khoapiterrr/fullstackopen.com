const router = require('express').Router();
const loginCtrl = require('../controllers/login');
router
  .route('/login')
  // login
  .post(loginCtrl.login);

module.exports = router;
