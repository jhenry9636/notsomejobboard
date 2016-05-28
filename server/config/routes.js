var recruiterRouter = require('../routes/recruiter.js')();
var developerRouter = require('../routes/developer.js')();
var loginRouter = require('../routes/login.js')();
var logoutRouter = require('../routes/logout.js')();
var requestRouter = require('../routes/request.js')();
var staticRouter = require('../routes/static.js')();
var authenticationCheck = require('../common/authcheck.js')

module.exports = function(server) {

  server.use('/api/developer', developerRouter)

  server.use('/api/recruiter', recruiterRouter)

  server.use('/api/request', requestRouter)

  server.use('/login', loginRouter)

  server.use('/', logoutRouter)

  server.use('/', staticRouter)
  
}