var express = require('express')
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

var CandidateModel = require('./models/candidateModel.js')();
var RecruiterModel = require('./models/recruiterModel.js')();
var ReviewModel = require('./models/reviewModel.js');
var ContactModel = require('./models/contactModel.js')();

var authenticationCheck = require('./util/util.js')

var db = mongoose.connect('mongodb://jarrad:when!23@ds045242.mongolab.com:45242/whenrecruited');

app.use(bodyParser.urlencoded({
	extended: false,
}))
app.use(cookieParser())
app.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}))
app.use(flash())
app.use(express.static('public'))

require('./configs/passport.js')(app, passport, CandidateModel, RecruiterModel, nodeMailer)
require('./configs/views.js')(app)
require('./routes/static.js')(app)


var candidateRouter = require('./routes/candidate.js')(CandidateModel, passport, nodeMailer)
app.use('/api/candidate', authenticationCheck, candidateRouter)

var recruiterRouter = require('./routes/recruiter.js')(RecruiterModel, passport, nodeMailer)
app.use('/api/recruiter', authenticationCheck, recruiterRouter)

var reviewRouter = require('./routes/reviews.js')(ReviewModel)
app.use('/api/reviews', authenticationCheck, reviewRouter)

var loginRouter = require('./routes/login.js')(passport)
app.use('/login', loginRouter)

var authenticationRouter = require('./routes/authentication.js')(app, passport)
app.use('/auth', authenticationRouter)

var authorizationRouter = require('./routes/authorization.js')(app, passport)
app.use('/connect', authorizationRouter)

// Log Out Route
require('./routes/logout.js')(app)

var fakerRouter = require('./routes/faker.js')(CandidateModel, RecruiterModel, ContactModel)
app.use('/faker', fakerRouter)

var verifyRouter = require('./routes/verify.js')(CandidateModel, RecruiterModel)
app.use('/verify', verifyRouter)

var dashboardRouter = require('./routes/dashboard.js')(CandidateModel, RecruiterModel, passport)
app.use('/dashboard', authenticationCheck, dashboardRouter)

require('./routes/contact.js')(app, ContactModel)


var port = 3333
app.listen(port, function(err) {
	console.log('Running .... ' + port)
})