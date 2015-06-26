var express = require('express')
var	mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var candidateStrategy = require('passport-local').Strategy;
var recruiterStrategy = require('passport-local').Strategy;

var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var CandidateModel = require('./models/candidateModel.js')
var RecruiterModel = require('./models/recruiterModel.js')
var ReviewModel = require('./models/reviewModel.js')

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

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportLocal.Strategy(function(username, password, done) {
	CandidateModel
		.findOne({username: username })
		.exec(function(err, user) {
			if(err) {
				done(new Error('ouch!'))
			}
			else if(!user) {
				done(null, null)
			}
			else {
				if(password == user.password) {
					done(null, user)
				}
				else {
					done(null, null)
				}
			}
		})

}))

passport.serializeUser(function(user, done) {
		done(null, user._id)
})

passport.deserializeUser(function(id, done) {
	CandidateModel.findById(id, function(err, user) {
		if(err) {
			throw err
		}

		done(null, user)
	})
})

require('./configs/views.js')(app)
require('./routes/static.js')(app, passport)


var candidateRouter = require('./routes/candidate.js')(CandidateModel, passport)
app.use('/api/candidate', candidateRouter)

var recruiterRouter = require('./routes/recruiter.js')(RecruiterModel)
app.use('/api/recruiter', recruiterRouter)

var reviewRouter = require('./routes/review.js')(ReviewModel)
app.use('/api/review', reviewRouter)




var port = 3333
app.listen(port, function() {
	console.log('Running .... ' + port)
})