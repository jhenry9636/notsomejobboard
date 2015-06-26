module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		console.log('here' + req.user)
		res.render('index', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		})
	})

	app.get('/login', function(req, res) {
		res.render('login')
	})

	app.post('/login', passport.authenticate('local'), function(req, res) {
		console.log(req.user)
		res.render('index')
	})

	app.get('/faq', function(req, res) {
		res.render('faq')
	})

	app.get('/contact', function(req, res) {
		res.render('contact')
	})

	app.get('/signup/recruiter', function(req, res) {
		res.render('recruiter')
	})

	app.get('/signup/candidate', function(req, res) {
		res.render('candidate')
	})

	app.get('/review', function(req, res) {
		res.render('review')
	})
}