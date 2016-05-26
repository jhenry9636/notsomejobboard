
module.exports = function(server) {

  server.get('/', function(req, res) {
    res.render('index')
  })

  server.get('/developer/signup', function(req, res) {
    res.render('developer.new.handlebars')
  })

  server.get('/developer/login', function(req, res) {
    res.render('developer.login.handlebars')
  })

  server.get('/developer/dashboard', function(req, res) {
    res.render('developer.dashboard.handlebars', {
      user: req.user
    })
  })


  server.get('/', function(req, res) {

  })

  server.get('/', function(req, res) {

  })

}