const studentProfileController = require('../controllers/studentProfile.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(studentProfileController.list)
  .post(studentProfileController.add);
  
  router.route("/update/:id")
    .put(studentProfileController.update);
  
  module.exports = router; 