var express = require('express');
var developerRouter = express.Router();
var developerCtrl = require('../controllers/developer.ctrl.js');

module.exports = function(server) {

  developerRouter.route('/')
    .get(developerCtrl.getAll)

  developerRouter.route('/add')
    .post(developerCtrl.add)

  developerRouter.route('/delete')
    .delete(developerCtrl.delete)

  developerRouter.route('/update')
    .post(developerCtrl.update)

  developerRouter.route('/:developerId')
    .get(developerCtrl.getById)

  //TODO: Add auth check
  server.use('/api/developer', developerRouter)
}