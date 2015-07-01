var express = require('express');
var loginRouter = express.Router();

module.exports = function(passport) {
	loginRouter.get('/candidate', function(req, res) {
		res.render('login', {
			isRecruiter: false
		})
	})
	.post('/candidate',
		passport.authenticate('candidate-strategy'),
		function(req, res, error) {
			console.log(req.user)
			res.render('index', {
				user: req.user
			})
	})

	loginRouter.get('/recruiter', function(req, res) {
		res.render('login', {
			isRecruiter: true
		})
	})
	.post('/recruiter', passport.authenticate('candidate-strategy'), function(req, res) {
		console.log(req.user)
		res.render('index')
	})

	return loginRouter
}