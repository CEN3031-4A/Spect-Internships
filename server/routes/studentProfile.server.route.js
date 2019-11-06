const studentProfileRouter = require('../controllers/studentProfile.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(studentProfileRouter.list)
  .post(studentProfileRouter.add);
  
  router.route("/update/:id")
    .put(studentProfileRouter.update);
  
  module.exports = router; 