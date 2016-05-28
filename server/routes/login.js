var passport = require('passport');
var express = require('express');
var loginRouter = express.Router();


module.exports = function(server) {

  loginRouter.route('/developer')
    .post(function(req, res, next) {
      var auth = passport.authenticate('developer', function(err, developer, info) {
        if (err) {
          console.log(err.toString())
          return next(err);
        }

        if (!developer) {
          return res.redirect('/');
        }

        req.logIn(developer, function(err) {
          if (err) { return next(err); }
          return res.redirect('/dashboard');
        });
      });

      auth(req, res, next)
    })

  loginRouter.route('/recruiter')
    .post(function(req, res, next) {
      var auth = passport.authenticate('recruiter', function(err, recruiter, info) {
        if (err) {
          console.log(err.toString())
          return next(err);
        }

        if (!recruiter) {
          return res.redirect('/');
        }

        req.logIn(recruiter, function(err) {
          if (err) { return next(err); }
          return res.redirect('/dashboard');
        });
      });

      auth(req, res, next)
    })

  return loginRouter
}