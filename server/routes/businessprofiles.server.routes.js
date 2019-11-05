const businessProfileRouter = require('../controllers/businessprofiles.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(businessProfileRouter.list)
  .post(businessProfileRouter.add);
  
  router.route("/update/:id")
    .put(businessProfileRouter.update);
  
  module.exports = router; 