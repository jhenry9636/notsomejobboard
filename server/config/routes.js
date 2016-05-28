var recruiterRouter = require('../routes/recruiter.js')();
var developerRouter = require('../routes/developer.js')();
var loginRouter = require('../routes/login.js')();
var logoutRouter = require('../routes/logout.js')();
var requestRouter = require('../routes/request.js')();
var staticRouter = require('../routes/static.js')();
var authenticationCheck = require('../common/authcheck.js')

module.exports = function(server) {

  server.use('/api/developer', authenticationCheck, developerRouter)

  server.use('/api/recruiter', authenticationCheck, recruiterRouter)

  server.use('/api/request', authenticationCheck, requestRouter)

  server.use('/login', loginRouter)

  server.use('/', logoutRouter)

  server.use('/', staticRouter)
  
}