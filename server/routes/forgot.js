var express = require('express');
var forgotRouter = express.Router();
var forgotCtrl = require('../controllers/forgot.ctrl.js');


module.exports = function() {

  forgotRouter.route('/')
    .post(forgotCtrl.sendEmail);

  forgotRouter.route('/verify/:tokenId')
    .get(forgotCtrl.verify);

  forgotRouter.route('/verify')
    .post(forgotCtrl.reset);

  return forgotRouter
}