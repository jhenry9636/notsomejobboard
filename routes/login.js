var express = require('express');
var loginRouter = express.Router();

module.exports = function(passport) {
	loginRouter.get('/', function(req, res) {
		res.render('login', {
			message: req.flash('message')
		})
	})
	.get('/candidate', function(req, res) {
		console.log('url')
		res.render('login', {
			message: req.flash('message')
		})
	})
	.post('/candidate',
		passport.authenticate('candidate-strategy'),
		function(req, res) {
			res.redirect('/')
	})

	loginRouter.get('/recruiter', function(req, res) {
		res.render('login', {
			message: req.flash('message')
		})
	})
	.post('/recruiter', passport.authenticate('candidate-strategy'), function(req, res) {
		console.log(req.user)
		res.render('index')
	})

	return loginRouter
}