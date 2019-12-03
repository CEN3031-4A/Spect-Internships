const internshipController = require('../controllers/internships.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(internshipController.list)
  .post(internshipController.add);

router.route("/update/:id")
  .put(internshipController.update);
  
module.exports = router;