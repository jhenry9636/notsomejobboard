var express = require('express');
var	mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var flash = require('connect-flash');

var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var nodeMailer = require('nodemailer');

var CandidateModel = require('./models/developer.model.js')();
var RecruiterModel = require('./models/recruiter.model.js')();
var ReviewModel = require('./models/review.model.js')();
var ContactModel = require('./models/contact.model.js')();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(express.static(__dirname + '/public'));

var authenticationCheck = require('./common/authCheck.js');

require('./config/mongoose.config.js')(mongoose)
require('./config/passport.config.js')(app, passport, CandidateModel, RecruiterModel, nodeMailer)
require('./config/views.config.js')(app)
require('./routes/static.route.js')(app)

var candidateCtrl = require('./controllers/developer.ctrl.js')(CandidateModel, passport, nodeMailer)
var candidateRouter = require('./routes/developer.route.js')(candidateCtrl)
app.use('/api/candidate', authenticationCheck, candidateRouter)

var recruiterCtrl = require('./controllers/recruiter.ctrl.js')(RecruiterModel, passport, nodeMailer)
var recruiterRouter = require('./routes/recruiter.route.js')(recruiterCtrl)
app.use('/api/recruiter', authenticationCheck, recruiterRouter)

var reviewRouter = require('./routes/reviews.route.js')(ReviewModel)
app.use('/api/reviews', authenticationCheck, reviewRouter)

var loginRouter = require('./routes/login.route.js')(passport)
app.use('/login', loginRouter)

// Log Out Route
require('./routes/logout.route.js')(app)

var fakerRouter = require('./routes/faker.route.js')(CandidateModel, RecruiterModel, ContactModel)
app.use('/faker', fakerRouter)

var verifyRouter = require('./routes/verify.route.js')(CandidateModel, RecruiterModel)
app.use('/verify', verifyRouter)

var dashboardRouter = require('./routes/dashboard.route.js')(CandidateModel, RecruiterModel, passport)
app.use('/dashboard', authenticationCheck, dashboardRouter)

require('./routes/contact.route.js')(app, ContactModel, CandidateModel, authenticationCheck)


var port = 80;
app.listen(port, function(err) {
	if(err) throw err;
	console.log('Running on port ' + port)
})