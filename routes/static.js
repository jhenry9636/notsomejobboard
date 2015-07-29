module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index', {
			message: req.flash('message'),
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		})
	})

	app.get('/faq', function(req, res) {
		res.render('faq')
	})

	app.get('/contactus', function(req, res) {
		res.render('contact')
	})

	app.get('/signup/recruiter', function(req, res) {
		res.render('recruiterSignup', {
			user: req.user,
			errors: req.flash('errors'),
			message: req.flash('message')
		})
	})

	app.get('/review', function(req, res) {
		res.render('review')
	})

	app.get('/confirm', function(req, res) {
		res.render('emailConfirmation')
	})

}