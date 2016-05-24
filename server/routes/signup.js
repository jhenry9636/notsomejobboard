var express = require('express');
var signUpRouter = express.Router();

module.exports = function(server) {

  signUpRouter.route('/developer')
    .get(function(req, res) {
      res.render('index')
    })

  signUpRouter.route('/recruiter')
    .get(function(req, res) {

    })

  server.use('/signup', signUpRouter)
}