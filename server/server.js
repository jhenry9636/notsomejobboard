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
var ReviewModel = require('./models/review.model.js');
var ContactModel = require('./models/contact.model.js')();

var authenticationCheck = require('./common/util.js');

var db = mongoose.connect('mongodb://jhenry:1234@ds045242.mongolab.com:45242/whenrecruited');

app.use(bodyParser.urlencoded({
	extended: false,
}));
app.use(cookieParser());
app.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(express.static(__dirname + '/public'));

require('./config/passport.js')(app, passport, CandidateModel, RecruiterModel, nodeMailer)
require('./config/views.js')(app)
require('./routes/static.js')(app)

var candidateCtrl = require('./controllers/candidateCtrl.js')(CandidateModel, passport, nodeMailer)
var candidateRouter = require('./routes/candidate.js')(candidateCtrl)
app.use('/api/candidate', authenticationCheck, candidateRouter)

var recruiterCtrl = require('./controllers/recruiterCtrl.js')(RecruiterModel, passport, nodeMailer)
var recruiterRouter = require('./routes/recruiter.js')(recruiterCtrl)
app.use('/api/recruiter', authenticationCheck, recruiterRouter)

var reviewRouter = require('./routes/reviews.js')(ReviewModel)
app.use('/api/reviews', authenticationCheck, reviewRouter)

var loginRouter = require('./routes/login.js')(passport)
app.use('/login', loginRouter)

// Log Out Route
require('./routes/logout.js')(app)

var fakerRouter = require('./routes/faker.js')(CandidateModel, RecruiterModel, ContactModel)
app.use('/faker', fakerRouter)

var verifyRouter = require('./routes/verify.js')(CandidateModel, RecruiterModel)
app.use('/verify', verifyRouter)

var dashboardRouter = require('./routes/dashboard.js')(CandidateModel, RecruiterModel, passport)
app.use('/dashboard', authenticationCheck, dashboardRouter)

require('./routes/contact.js')(app, ContactModel, CandidateModel)


var port = 3333
app.listen(port, function(err) {
	if(err) throw err;
	console.log('Running .... ' + port)
})