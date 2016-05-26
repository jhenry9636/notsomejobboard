var RecruiterStrategy = require('passport-local').Strategy;
var DeveloperStrategy = require('passport-local').Strategy;
var Recruiter = mongoose.model('Recruiter');
var Developer = mongoose.model('Developer');

module.exports = function() {

  passport.use(new RecruiterStrategy(
    function(emailAddress, password, done) {
      Recruiter.findOne({primaryEmail: emailAddress}).exec(function(err, recruiter) {
        if(err) {
          return done(err, false)
        }
        if(recruiter && recruiter.comparePassword(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
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