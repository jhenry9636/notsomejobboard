var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, passport, CandidateModel, RecruiterModel) {

	app.use(passport.initialize())
	app.use(passport.session())

	passport.serializeUser(function(user, done) {
			if(user.isRecruiter) {
				done(null, {
					id: user._id,
					isRecruiter: true
				})
			}
			else {
				done(null, {
					id: user._id,
					isRecruiter: false
				})
			}
	})

	passport.deserializeUser(function(serializedObj, done) {

		if(serializedObj.isRecruiter) {
			RecruiterModel.findById(serializedObj.id, function(err, user) {
				if(err) throw err

				done(null, user)
			})
		}
		else {
			CandidateModel.findById(serializedObj.id, function(err, user) {
				if(err) throw err

				done(null, user)
			})
		}
	})

	passport.use('candidate-strategy', new LocalStrategy({usernameField: 'emailAddress'},function(emailAddress, password, done) {
		CandidateModel
		.findOne({emailAddress: emailAddress })
		.exec(function(err, candidate) {
			if(err) {
				done(new Error('ouch!'))
			}
			else if(!candidate) {
				done(null, null, {message: 'Invalid username or password'})
			}
			else {
				console.log('result ', candidate.validPassword(password))
				if(candidate.validPassword(password)) {
					done(null, candidate)
				}
				else {
					done(null, null, {message: 'Invalid username or password'})
				}
			}
		})
	}))

	passport.use('recruiter-strategy', new LocalStrategy({usernameField: 'emailAddress'},function(emailAddress, password, done) {
		RecruiterModel
		.findOne({emailAddress: emailAddress })
		.exec(function(err, recruiter) {
			if(err) {
				done(new Error('ouch!'))
			}
			else if(!recruiter) {
				done(null, null, {message: 'Invalid username or password'})
			}
			else {
				if(recruiter.comparePassword(password)) {
					done(null, recruiter)
				}
				else {
					done(null, null, {message: 'Invalid username or password'})
				}
			}
		})
	}))

}