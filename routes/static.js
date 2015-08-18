module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index', {
			message: req.flash('message'),
			isAuthenticated: req.isAuthenticated(),
			user: req.user,
			page: 'home'
		})
	})

	app.get('/faq', function(req, res) {
		res.render('faq', {
			page: 'faq',
			user: req.user
		})
	})

	app.get('/contact', function(req, res) {
		res.render('contact', {
			page: 'contact',
			user: req.user
		})
	})

	app.get('/signup/', function(req, res) {
		res.render('signUp', {
			user: req.user,
			page: 'signup',
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