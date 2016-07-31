var RecruiterStrategy = require('passport-local').Strategy;
var DeveloperStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var passport = require('passport');
var Recruiter = mongoose.model('Recruiter');
var Developer = mongoose.model('Developer');

module.exports = function() {

  passport.use('developer', new DeveloperStrategy({
      usernameField: 'primaryEmail'
    },
    function(emailAddress, password, done) {
      Developer.findOne({primaryEmail: emailAddress}).exec(function(err, developer) {
        if(err) {
          return done(err, false)
        }

        if(!developer) {
          return done(null, false)
        }

        developer.comparePassword(password, function(err, isMatch) {
          if(err) throw err;

          if(!isMatch) {
            return done(null, false)
          }

          if(isMatch) {
            return done(null, developer)
          }

        })

      })
    }
  ));

  passport.use('recruiter', new RecruiterStrategy({
    usernameField: 'primaryEmail'
  },
    function(emailAddress, password, done) {
      console.log(emailAddress, password)
      Recruiter.findOne({primaryEmail: emailAddress}).exec(function(err, recruiter) {
        if(err) {
          return done(err, false)
        }

        if(!recruiter) {
          return done(null, false)
        }

        recruiter.comparePassword(password, function(err, isMatch) {
          if(err) throw err;

          if(!isMatch) {
            return done(null, false)
          }

          if(isMatch) {
            return done(null, recruiter)
          }

        })
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    var obj = {
      primaryEmail: user.primaryEmail
    }

    //Checking if user is a recruiter or dev
    if(user.isDeveloper) {
      obj.isDev = true
      done(null, obj);
    }
    else {
      done(null, obj);
    }
  });

  passport.deserializeUser(function(serializedObj, done) {

    if(serializedObj.isDev) {
      Developer.findOne(
        {primaryEmail: serializedObj.primaryEmail }).exec(function(err, developer) {
        if(err) {
          return done(err, false)
        }
        if(!developer) {
          return done(null, false);
        }
        return done(null, developer);
      })
    }
    else {
      Recruiter.findOne(
        {primaryEmail: serializedObj.primaryEmail }).exec(function(err, recruiter) {
        if(err) {
          return done(err, false)
        }
        if(!recruiter) {
          return done(null, false);
        }
        return done(null, recruiter);
      })
    }

  })

}