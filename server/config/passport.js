var RecruiterStrategy = require('passport-local').Strategy;
var DeveloperStrategy = require('passport-local').Strategy;
var Recruiter = mongoose.model('Recruiter');
var Developer = mongoose.model('Developer');

module.exports = function() {

  passport.use(new RecruiterStrategy(
    function(emailAddress, password, done) {
      Recruiter.findOne({primaryEmail: emailAddress}).exec(function(err, recruiter) {
        if(recruiter && recruiter.comparePassword(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(err, user) {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  })

}