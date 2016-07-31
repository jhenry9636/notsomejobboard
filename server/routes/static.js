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
    .get(authenticationCheck, function(req, res) {
    // .get(function(req, res) {
      console.log('LOG IN'+ req.user)
      res.render('dashboard', {
        user: req.user,
        pageType: 'dashboard'
      })
    })

  staticRouter.route('/search')
    .get(function(req, res) {
      res.render('search', {
        user: req.user
      })
    })



  return staticRouter
}