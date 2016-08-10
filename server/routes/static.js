var express = require('express');
var staticRouter = express.Router();
var authenticationCheck = require('../common/authcheck.js')

module.exports = function() {

  staticRouter.route('/')
    .get(function(req, res) {
      res.render('index', {
          user: req.user,
          login: req.query.login
        })
    })

  staticRouter.route('/join')
    .get(function(req, res) {
      res.render('join', {
        user: req.user
      })
    })

  staticRouter.route('/join/recruiter')
    .get(function(req, res) {
      res.render('join-recruiter', {
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
    //TODO: Add auth check back in before launch
    // .get(authenticationCheck, function(req, res) {
    .get(function(req, res) {
      res.render('dashboard', {
        user: req.user,
        pageType: 'dashboard'
      })
    })

  staticRouter.route('/search')
    .get(authenticationCheck, function(req, res) {
      res.render('search', {
        user: req.user
      })
    })


  staticRouter.route('/forgot')
    .get(function(req, res) {
      res.render('forgot', {
        user: req.user,
        hasError: req.query.error
      })
    })

  staticRouter.route('/change')
    .get(function(req, res) {
      res.render('change')
    })


  return staticRouter
}