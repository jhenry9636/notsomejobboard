var express = require('express');
var	mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var flash = require('connect-flash');
var path = require('path');

var server = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var nodeMailer = require('nodemailer');
var expressHandlebars  = require('express-handlebars');

var CandidateModel = require('./models/developer.model.js')();
var RecruiterModel = require('./models/recruiter.model.js')();
var ReviewModel = require('./models/review.model.js')();
var ContactModel = require('./models/contact.model.js')();

server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}));

server.use(flash());
server.use(express.static(path.join(__dirname, '../public')));
var authenticationCheck = require('./common/authCheck.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

require('./config/mongoose.config.js')(env, mongoose)
require('./config/passport.config.js')(server, passport, CandidateModel, RecruiterModel, nodeMailer)
require('./config/views.config.js')(server, expressHandlebars, path)
require('./routes/static.route.js')(server)

var candidateCtrl = require('./controllers/developer.ctrl.js')(CandidateModel, passport, nodeMailer)
var candidateRouter = require('./routes/developer.route.js')(candidateCtrl)
server.use('/api/candidate', authenticationCheck, candidateRouter)

var recruiterCtrl = require('./controllers/recruiter.ctrl.js')(RecruiterModel, passport, nodeMailer)
var recruiterRouter = require('./routes/recruiter.route.js')(recruiterCtrl)
server.use('/api/recruiter', authenticationCheck, recruiterRouter)

var reviewRouter = require('./routes/reviews.route.js')(ReviewModel)
server.use('/api/reviews', authenticationCheck, reviewRouter)

var loginRouter = require('./routes/login.route.js')(passport)
server.use('/login', loginRouter)

// Log Out Route
require('./routes/logout.route.js')(server)

var fakerRouter = require('./routes/faker.route.js')(CandidateModel, RecruiterModel, ContactModel)
server.use('/faker', fakerRouter)

var verifyRouter = require('./routes/verify.route.js')(CandidateModel, RecruiterModel)
server.use('/verify', verifyRouter)

var dashboardRouter = require('./routes/dashboard.route.js')(CandidateModel, RecruiterModel, passport)
server.use('/dashboard', authenticationCheck, dashboardRouter)

require('./routes/contact.route.js')(server, ContactModel, CandidateModel, authenticationCheck)


var port = process.env.PORT || 8080;
server.listen(port, function(err) {
	if(err) throw err;
	console.log('Running on port ' + port)
})