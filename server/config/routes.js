var recruiterRouter = require('../routes/recruiter.js')();
var developerRouter = require('../routes/developer.js')();
var loginRouter = require('../routes/login.js')();
var requestRouter = require('../routes/request.js')();
var authenticationCheck = require('../common/authcheck.js')

module.exports = function(server) {

  server.use('/api/developer', developerRouter)

  server.use('/api/recruiter', recruiterRouter)

  server.use('/api/request', requestRouter)

  server.use('/login', loginRouter)

  server.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  server.get('/', function(req, res) {
    res.render('index')
  })

  server.get('/contact', function(req, res) {
    res.render('contact')
  })

  server.get('/page/signup', function(req, res) {
    res.render('developer.new.handlebars')
  })

  server.get('/page/login', function(req, res) {
    res.render('developer.login.handlebars')
  })

  server.get('/page/dashboard', authenticationCheck.isAuthenticated, function(req, res) {
    res.render('developer.dashboard.handlebars', {
      user: req.user
    })
  })


}