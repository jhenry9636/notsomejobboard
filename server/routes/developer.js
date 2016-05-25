var express = require('express');
var developerRouter = express.Router();
var developerCtrl = require('../controllers/developer.ctrl.js');

module.exports = function(server) {

  developerRouter.route('/add')
    .post(developerCtrl.add)

  developerRouter.route('/delete')
    .post(developerCtrl.delete)

  developerRouter.route('/update')
    .post(developerCtrl.update)

  developerRouter.route('/:developerId')
    .get(developerCtrl.getById)

  developerRouter.route('/')
    .get(developerCtrl.getAll)

  //TODO: Add auth check
  server.use('/api/developer', developerRouter)
}
