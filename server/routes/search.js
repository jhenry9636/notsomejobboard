var express = require('express');
var searchRouter = express.Router();
var searchCtrl = require('../controllers/search.ctrl.js');
var authenticationCheck = require('../common/authcheck.js');

module.exports = function() {

  searchRouter.route('/')
    .post(searchCtrl.search)

  return searchRouter
}