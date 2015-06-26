module.exports = function(app) {
	app.get('/', function(req, res) {
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