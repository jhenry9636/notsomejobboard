var express = require('express');
var authenticationRouter = express.Router();

module.exports = function(app, passport) {
	authenticationRouter.get('/linkedIn',
		passport.authenticate('linkedIn-strategy', { scope: ['r_emailaddress'] }))

	authenticationRouter.get('/linkedIn/callback',
		passport.authenticate('linkedIn-strategy', {
	  	successRedirect : '/dashboard/candidate',
	  	failureRedirect : '/login',
	  	failureFlash : true
	}))

	authenticationRouter.get('/github',
		passport.authenticate('github-strategy'))

	authenticationRouter.get('/github/callback',
		passport.authenticate('github-strategy', {
	  	successRedirect : '/dashboard/candidate',
	  	failureRedirect : '/login',
	  	failureFlash : true
	}))

	authenticationRouter.get('/google',
		passport.authenticate('google-strategy', { scope : ['profile', 'email'] }))

	authenticationRouter.get('/google/callback',
		passport.authenticate('google-strategy', {
	  	successRedirect : '/dashboard/candidate',
	  	failureRedirect : '/login',
	  	failureFlash : true
	}))



	return authenticationRouter
}