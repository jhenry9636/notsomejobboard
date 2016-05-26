var authCheck = require('../common/authcheck.js')


module.exports = function(server) {

  server.get('/', function(req, res) {
    res.render('index')
  })

  server.get('/page/signup', function(req, res) {
    res.render('developer.new.handlebars')
  })

  server.get('/page/login', function(req, res) {
    res.render('developer.login.handlebars')
  })

  server.get('/page/dashboard', authCheck.isAuthenticated, function(req, res) {
    res.render('developer.dashboard.handlebars', {
      user: req.user
    })
  })


  server.get('/', function(req, res) {

  })

  server.get('/', function(req, res) {

  })

}