var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, passport, CandidateModel, RecruiterModel) {

	app.use(passport.initialize())
	app.use(passport.session())

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

	passport.use('candidate-strategy', new LocalStrategy(function(username, password, done) {
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

	passport.use('recruiter-strategy', new LocalStrategy(function(username, password, done) {
		RecruiterModel
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

}
