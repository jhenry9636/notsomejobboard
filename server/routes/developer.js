var express = require('express');
var developerRouter = express.Router();
var developerCtrl = require('../controllers/developer.ctrl.js');

module.exports = function(server) {

  developerRouter.route('/developer')
      .get(developerCtrl.getAll)
      .post(developerCtrl.create)


  server.use('/api', developerRouter)
}
