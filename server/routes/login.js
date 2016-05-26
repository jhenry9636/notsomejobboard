var passport = require('passport');

module.exports = function(server) {

  server.post('/developer/login', function(req, res, next) {
    var auth = passport.authenticate('developer', function(err, developer, info) {
      if (err) {
        console.log(err.toString())
        return next(err);
      }

      if (!developer) {
        console.log('nothing')
        return res.redirect('/page/login');
      }

      req.logIn(developer, function(err) {
        if (err) { return next(err); }
        console.log("Log in")
        console.dir(req.user)
        return res.redirect('/page/dashboard');
      });
    });

    auth(req, res, next)
  })

}