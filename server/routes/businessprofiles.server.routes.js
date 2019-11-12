const businessProfileRouter = require('../controllers/businessprofiles.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(businessProfileRouter.list)
  .post(businessProfileRouter.add);

router.route('/:id')
  .get(businessProfileRouter.findOne)
  .put(businessProfileRouter.update);

  module.exports = router; 