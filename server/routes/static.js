var express = require('express');
var staticRouter = express.Router();
var authenticationCheck = require('../common/authcheck.js')

module.exports = function() {

  staticRouter.route('/')
    .get(function(req, res) {
      res.render('index', {
          user: req.user
        })
    })

  staticRouter.route('/join')
    .get(function(req, res) {
      res.render('join', {
        user: req.user
      })
    })
  
  staticRouter.route('/contact')
    .get(function(req, res) {
      res.render('contact', {
        user: req.user
      })
    })

  staticRouter.route('/dashboard')
    .get(authenticationCheck, function(req, res) {

      res.render('dashboard', {
        user: req.user,
        pageType: 'dashboard'
      })
    })



  return staticRouter
}