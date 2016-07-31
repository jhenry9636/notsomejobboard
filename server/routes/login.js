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
          return res.status(403).send({
            success: false,
            reason: 'Invalid username or password'
          })
        }

        req.login(developer, function(err) {
          if (err) { return next(err); }
          return res.send({
            success: true,
            collection: developer
          })
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
          return res.status(403).send({
            success: false,
            reason: 'Invalid username or password'
          })
        }

        req.logIn(recruiter, function(err) {
          if (err) { return next(err); }
          return res.send({
            success: true,
            collection: recruiter
          })
        });
      });

      auth(req, res, next)
    })

  return loginRouter
}