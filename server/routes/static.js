
module.exports = function(server) {

  server.get('/', function(req, res) {
    res.render('index')
  })

  server.get('/developer/login', function(req, res) {
    res.render('dev')
  })

  server.get('/', function(req, res) {

  })

  server.get('/', function(req, res) {

  })

}