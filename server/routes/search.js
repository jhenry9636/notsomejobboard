var express = require('express');
var searchRouter = express.Router();
var authenticationCheck = require('../common/authcheck.js');

module.exports = function() {

  searchRouter.route('/')
    .get(function(req, res) {
      res.render('search', {
        user: req.user
      })
    })

  return searchRouter
}