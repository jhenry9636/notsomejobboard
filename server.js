var express = require('express');
var	mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var flash = require('connect-flash');
var path = require('path');
var https = require('https');
var http = require('http');
var fs = require('fs');

var server = express();

// This line is from the Node.js HTTPS documentation.
var cert = {
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem')
};

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var nodeMailer = require('nodemailer');
var expressHandlebars  = require('express-handlebars');

var CandidateModel = require(__dirname + '/server/models/developer.model.js')();
var RecruiterModel = require(__dirname + '/server/models/recruiter.model.js')();
var ReviewModel = require(__dirname + '/server/models/review.model.js')();
var ContactModel = require(__dirname + '/server/models/contact.model.js')();

server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}));

server.use(flash());
server.use(express.static(path.join(__dirname, '/public')));
var authenticationCheck = require(__dirname + '/server/common/authcheck.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

require(__dirname + '/server/config/mongoose.config.js')(env, mongoose)
require(__dirname + '/server/config/passport.config.js')(server, passport, CandidateModel, RecruiterModel, nodeMailer)
require(__dirname + '/server/config/views.config.js')(server, expressHandlebars, path)
require(__dirname + '/server/routes/static.route.js')(server)

var candidateCtrl = require(__dirname + '/server/controllers/developer.ctrl.js')(CandidateModel, passport, nodeMailer)
var candidateRouter = require(__dirname + '/server/routes/developer.route.js')(candidateCtrl)
server.use('/api/candidate', authenticationCheck, candidateRouter)

var recruiterCtrl = require(__dirname + '/server/controllers/recruiter.ctrl.js')(RecruiterModel, passport, nodeMailer)
var recruiterRouter = require(__dirname + '/server/routes/recruiter.route.js')(recruiterCtrl)
server.use('/api/recruiter', authenticationCheck, recruiterRouter)

var reviewRouter = require(__dirname + '/server/routes/reviews.route.js')(ReviewModel)
server.use('/api/reviews', authenticationCheck, reviewRouter)

var loginRouter = require(__dirname + '/server/routes/login.route.js')(passport)
server.use('/login', loginRouter)

// Log Out Route
require(__dirname + '/server/routes/logout.route.js')(server)

var fakerRouter = require(__dirname + '/server/routes/faker.route.js')(CandidateModel, RecruiterModel, ContactModel)
server.use('/faker', fakerRouter)

var verifyRouter = require(__dirname + '/server/routes/verify.route.js')(CandidateModel, RecruiterModel)
server.use('/verify', verifyRouter)

var dashboardRouter = require(__dirname + '/server/routes/dashboard.route.js')(CandidateModel, RecruiterModel, passport)
server.use('/dashboard', authenticationCheck, dashboardRouter)

require(__dirname + '/server/routes/contact.route.js')(server, ContactModel, CandidateModel, authenticationCheck)


var port = process.env.PORT || 8080;

http.createServer(server).listen(port, function(err) {
  if(err) throw err;
  console.log('Running on port ' + port)
});

// Create an HTTPS service identical to the HTTP service.
// https.createServer(cert, server).listen(port, function(err) {
//   if(err) throw err;
//   console.log('Running on port ' + 9090)
// });

