var express = require('express');
var requestRouter = express.Router();
var requestCtrl = require('../controllers/request.ctrl.js');


module.exports = function(server) {

  requestRouter.route('/')
    .get(requestCtrl.getAll)

  requestRouter.route('/add')
    .post(requestCtrl.add)

  requestRouter.route('/update')
    .post(requestCtrl.setAccepted)

  requestRouter.route('/delete')
    .delete(requestCtrl.delete)

  requestRouter.route('/developer/:developerId')
    .get(requestCtrl.getByDeveloperId)

  requestRouter.route('/recruiter/:recruiterId')
    .get(requestCtrl.getByRecruiterId)

  return requestRouter
}