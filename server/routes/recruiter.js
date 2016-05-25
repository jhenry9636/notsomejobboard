var express = require('express');
var recruiterRouter = express.Router();
var recruiterCtrl = require('../controllers/recruiter.ctrl.js');

module.exports = function(server) {

  recruiterRouter.route('/recruiter')
    .get(recruiterCtrl.getAll)
    .post(recruiterCtrl.create)


  server.use('/api', recruiterRouter)
}
