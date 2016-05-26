var express = require('express');
var recruiterRouter = express.Router();
var recruiterCtrl = require('../controllers/recruiter.ctrl.js');

module.exports = function(server) {

  recruiterRouter.route('/')
    .get(recruiterCtrl.getAll)

  recruiterRouter.route('/add')
    .post(recruiterCtrl.add)

  recruiterRouter.route('/delete')
    .post(recruiterCtrl.delete)

  recruiterRouter.route('/update')
    .post(recruiterCtrl.update)

  recruiterRouter.route('/:developerId')
    .get(recruiterCtrl.getById)

  //TODO: Add auth check
  server.use('/api/recruiter', recruiterRouter)
}
