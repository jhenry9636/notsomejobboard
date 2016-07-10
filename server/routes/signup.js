
var express = require('express');
var signUpRounter = express.Router();
var developerCtrl = require('../controllers/developer.ctrl.js');
var recruiterCtrl = require('../controllers/recruiter.ctrl.js');

module.exports = function() {

  signUpRounter.route('/developer')
    .post(developerCtrl.add)

  signUpRounter.route('/recruiter')
    .post(recruiterCtrl.add)

  return signUpRounter
}