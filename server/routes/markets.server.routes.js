const marketRouter = require('../controllers/market.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(marketRouter.list)
  .post(marketRouter.add);

router.route("/update/:id")
  .put(marketRouter.update);

router.route("/listing")
    .get(marketRouter.list)
  
module.exports = router;