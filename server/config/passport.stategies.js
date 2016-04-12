var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth.js');

//TODO: Don't let users delete unlink the last account.

module.exports = function(app, passport, CandidateModel, RecruiterModel, nodeMailer) {

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

	passport.use('candidate-signup', new LocalStrategy({
			usernameField: 'emailAddress',
		    passReqToCallback: true
		},
		function(req, emailAddress, password, done) {

      process.nextTick(function(err) {
				CandidateModel
					.findOne({'local.emailAddress': emailAddress })
					.exec(function(err, candidate) {
						if(err) done(err);

						if(candidate) {
							done(null, false, {message: 'User already exists.'})
						}
						else {
							var candidate = new CandidateModel();
							candidate.firstName = req.body.firstName;
							candidate.lastName = req.body.lastName;
							candidate.local.emailAddress = emailAddress;
							candidate.local.password = candidate.generateHash(password);

							candidate.save(function(err, candidate) {
								if(err) throw err
								var transporter = nodeMailer.createTransport({
								    service: 'gmail',
								    auth: {
								        user: 'jarrad.henry@gmail.com',
								        pass: 'today!11'
								    }
								});
								transporter.sendMail({
								    from: 'support',
								    to: emailAddress,
								    subject: 'Please confirm your email address',
								    html: '<a href="http://127.0.0.1:3333/verify/candidate?token='+candidate.authToken+'">Confirm</a>'
								}, function(err) {
									if(err) throw err
									done(null, candidate)
								});

							})
						}

					})
			})

		}))


	passport.use('candidate-login', new LocalStrategy({usernameField: 'emailAddress'},
		function(emailAddress, password, done) {
			CandidateModel
				.findOne({'local.emailAddress': emailAddress })
				.exec(function(err, candidate) {
					if(err) {
						return done(err)
					}

					if(!candidate) {
						return done(null, null, {message: 'We could not locate a user with that email address.'})
					}

					if(!candidate.validPassword(password)) {
						return done(null, null, {message: 'Invalid password'})
					}

					 return done(null, candidate)
				})
		}))

	passport.use('recruiter-strategy', new LocalStrategy({
		usernameField: 'emailAddress',
    	passReqToCallback: true
	},
	function(emailAddress, password, done) {
		RecruiterModel
		.findOne({emailAddress: emailAddress })
		.exec(function(err, recruiter) {
			if(err) {
				return done(err)
			}
			
			if(!recruiter) {
				return done(null, null, {message: 'We could not locate a user with that email address.'})
			}

			if(!recruiter.comparePassword(password)) {
				return done(null, null, {message: 'Invalid password'})
			}

			return done(null, recruiter)
		})
	}))


passport.use('linkedIn-strategy', new LinkedInStrategy({
    consumerKey: configAuth.linkedInAuth.clientID,
    consumerSecret: configAuth.linkedInAuth.clientSecret,
    callbackURL: configAuth.linkedInAuth.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
  },
  function(req, token, refreshToken, profile, done) {
  	console.log('reg______',req.user)
  	if(!req.user) {
			CandidateModel
				.findOne({'linkedIn.id': profile.id })
				.exec(function(err, candidate) {
					if(err) done(err);

					if(candidate) {
						return done(null, candidate);
					}
					else {
						var candidate = new CandidateModel();
						candidate.linkedIn.firstName = profile.name.givenName
						candidate.linkedIn.lastName = profile.name.familyName
						candidate.linkedIn.emailAddress = profile.emails[0].value
						candidate.linkedIn.id = profile.id
						candidate.linkedIn.token = token
						candidate.save(function(err, candidate) {
							if(err) throw err;
							return done(null, candidate)
						})
					}
				})
		} else {
			var user = req.user
			user.linkedIn.firstName = profile.name.givenName
			user.linkedIn.lastName = profile.name.familyName
			user.linkedIn.emailAddress = profile.emails[0].value
			user.linkedIn.id = profile.id
			user.linkedIn.token = token
			user.save(function(err, user) {
				if(err) throw err;
				return done(null, user)
			})
		} 
	}));

passport.use('github-strategy', new GithubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    passReqToCallback: true,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  function(req, token, refreshToken, profile, done) {
  	console.log('reg______',req.user)
  	if(!req.user) {
			CandidateModel
				.findOne({'github.id': profile.id })
				.exec(function(err, candidate) {
					if(err) done(err);

					console.dir(profile)

					if(candidate) {
						return done(null, candidate);
					}
					else {
						var candidate = new CandidateModel();
						candidate.github.firstName = profile.displayName ? profile.displayName.split(' ')[0] : ''
						candidate.github.lastName = profile.displayName ? profile.displayName.split(' ')[1] : ''
						candidate.github.emailAddress = profile.emails[0].value
						candidate.github.id = profile.id
						candidate.github.token = token
						candidate.save(function(err, candidate) {
							if(err) throw err;
							return done(null, candidate)
						})
					}
				})
		} else {
			var user = req.user;
			user.github.firstName = profile.displayName ? profile.displayName.split(' ')[0] : ''
			user.github.lastName = profile.displayName ? profile.displayName.split(' ')[1] : ''
			user.github.emailAddress = profile.emails[0].value
			user.github.id = profile.id
			user.github.token = token
			user.save(function(err, user) {
				if(err) throw err;
				return done(null, user)
			})
		} 
	}));

passport.use('google-strategy', new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
  	console.log('reg______',req.user)
  	if(!req.user) {
			CandidateModel
				.findOne({'google.id': profile.id })
				.exec(function(err, candidate) {
					if(err) done(err);

					if(candidate) {
						return done(null, candidate);
					}
					else {
						console.log(profile)
						var candidate = new CandidateModel();
						candidate.google.firstName = profile.name.givenName
						candidate.google.lastName = profile.name.familyName
						candidate.google.emailAddress = profile.emails[0].value
						candidate.google.id = profile.id
						candidate.google.token = token
						candidate.save(function(err, candidate) {
							if(err) throw err;
							return done(null, candidate)
						})
					}
				})
		} else {
			var user = req.user;
			user.google.firstName = profile.name.givenName
			user.google.lastName = profile.name.familyName
			user.google.emailAddress = profile.emails[0].value
			user.google.id = profile.id
			user.google.token = token
			user.save(function(err, user) {
				if(err) throw err;
				return done(null, user)
			})
		} 
	}));



}
