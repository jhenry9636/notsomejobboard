var express = require('express');
var authorizationRouter = express.Router();

module.exports = function(app, passport) {
	authorizationRouter.get('/linkedIn',
		passport.authorize('linkedIn-strategy', { scope: ['r_emailaddress'] }))

	authorizationRouter.get('/linkedIn/callback',
		passport.authorize('linkedIn-strategy', {
	  	successRedirect : '/dashboard/candidate',
	  	failureRedirect : '/login',
	  	failureFlash : true
	}))

	authorizationRouter.get('/github',
		passport.authorize('github-strategy'))

	authorizationRouter.get('/github/callback',
		passport.authorize('github-strategy', {
	  	successRedirect : '/dashboard/candidate',
	  	failureRedirect : '/login',
	  	failureFlash : true
	}))

	authorizationRouter.get('/google',
		passport.authorize('google-strategy', { scope : ['profile', 'email'] }))

	authorizationRouter.get('/google/callback',
		passport.authorize('google-strategy', {
	  	successRedirect : '/dashboard/candidate',
	  	failureRedirect : '/login',
	  	failureFlash : true
	}))



	return authorizationRouter
}