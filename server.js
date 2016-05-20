var express = require('express');
var	mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var flash = require('connect-flash');
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');
var enforceSSL = require('express-sslify');

var server = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var nodeMailer = require('nodemailer');
var expressHandlebars  = require('express-handlebars');

var CandidateModel = require(process.env.PWD + '/server/models/developer.model.js')();
var RecruiterModel = require(process.env.PWD + '/server/models/recruiter.model.js')();
var ReviewModel = require(process.env.PWD + '/server/models/review.model.js')();
var ContactModel = require(process.env.PWD + '/server/models/contact.model.js')();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.PWD = process.cwd();

server.use(enforceSSL.HTTPS({ trustProtoHeader: true }))

var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
    console.log('Forcing SSL')
    server.use(forceSsl);
}

server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}));

server.use(flash());
server.use(express.static(path.join(process.env.PWD, '/public')));
var authenticationCheck = require(process.env.PWD + '/server/common/authcheck.js');

require(process.env.PWD + '/server/config/mongoose.config.js')(env, mongoose)
require(process.env.PWD + '/server/config/passport.config.js')(server, passport, CandidateModel, RecruiterModel, nodeMailer)
require(process.env.PWD + '/server/config/views.config.js')(server, expressHandlebars, path)
require(process.env.PWD + '/server/routes/static.route.js')(server)

var candidateCtrl = require(process.env.PWD + '/server/controllers/developer.ctrl.js')(CandidateModel, passport, nodeMailer)
var candidateRouter = require(process.env.PWD + '/server/routes/developer.route.js')(candidateCtrl)
server.use('/api/candidate', authenticationCheck, candidateRouter)

var recruiterCtrl = require(process.env.PWD + '/server/controllers/recruiter.ctrl.js')(RecruiterModel, passport, nodeMailer)
var recruiterRouter = require(process.env.PWD + '/server/routes/recruiter.route.js')(recruiterCtrl)
server.use('/api/recruiter', authenticationCheck, recruiterRouter)

var reviewRouter = require(process.env.PWD + '/server/routes/reviews.route.js')(ReviewModel)
server.use('/api/reviews', authenticationCheck, reviewRouter)

var loginRouter = require(process.env.PWD + '/server/routes/login.route.js')(passport)
server.use('/login', loginRouter)

// Log Out Route
require(process.env.PWD + '/server/routes/logout.route.js')(server)

var fakerRouter = require(process.env.PWD + '/server/routes/faker.route.js')(CandidateModel, RecruiterModel, ContactModel)
server.use('/faker', fakerRouter)

var verifyRouter = require(process.env.PWD + '/server/routes/verify.route.js')(CandidateModel, RecruiterModel)
server.use('/verify', verifyRouter)

var dashboardRouter = require(process.env.PWD + '/server/routes/dashboard.route.js')(CandidateModel, RecruiterModel, passport)
server.use('/dashboard', authenticationCheck, dashboardRouter)

require(process.env.PWD + '/server/routes/contact.route.js')(server, ContactModel, CandidateModel, authenticationCheck)


var port = process.env.PORT || 8080;


//This line is from the Node.js HTTPS documentation.
var cert = {
  key: fs.readFileSync(process.env.PWD + '/certs/key.pem'),
  cert: fs.readFileSync(process.env.PWD + '/certs/cert.pem')
};

var httpsServer = https.createServer(cert, server);

httpsServer.listen(port, function(){
    console.log("server running at https: " + port)
});


