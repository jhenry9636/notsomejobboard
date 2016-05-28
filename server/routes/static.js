var express = require('express');
var staticRouter = express.Router();

module.exports = function() {

  staticRouter.route('/')
    .get(function(req, res) {
      res.render('index', {
          user: req.user
        })
    })

  staticRouter.route('/join')
    .get(function(req, res) {
      res.render('join')
    })
  
  staticRouter.route('/contact')
    .get(function(req, res) {
      res.render('contact', {
        user: req.user
      })
    })

  staticRouter.route('/dashboard')
    .get(function(req, res) {
      res.render('dashboard', {
        user: req.user
      })
    })



  return staticRouter
}