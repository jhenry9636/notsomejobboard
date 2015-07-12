var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, passport, CandidateModel, RecruiterModel) {

	app.use(passport.initialize())
	app.use(passport.session())

	passport.serializeUser(function(user, done) {
			if(user.isRecruiter) {
				var serializedObj = 
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
		.exec(function(err, user) {
			if(err) {
				done(new Error('ouch!'))
			}
			else if(!user) {
				done(null, null, {message: 'Invalid username or password'})
			}
			else {
				if(password == user.password) {
					done(null, user)
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
		.exec(function(err, user) {
			if(err) {
				done(new Error('ouch!'))
			}
			else if(!user) {
				done(null, null, {message: 'Invalid username or password'})
			}
			else {
				if(password == user.password) {
					done(null, user)
				}
				else {
					done(null, null, {message: 'Invalid username or password'})
				}
			}
		})
	}))

}
