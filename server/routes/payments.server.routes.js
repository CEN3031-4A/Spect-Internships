const paymentsController = require('../controllers/Payments.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/charge')
  .post(paymentsController.charge);

  module.exports = router; 