const internshipController = require('../controllers/internships.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(internshipController.list);

router.route('/:id')
  .get(internshipController.findOne)
  .post(internshipController.add);

router.route('/:id/delete')
  .delete(internshipController.delete);

router.route("/:id/update")
  .put(internshipController.update);
  
module.exports = router;