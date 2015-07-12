var express = require('express');
var dashboardRouter = express.Router();
var authenticationCheck = require('../util/util.js')


module.exports = function(CandidateModel, RecruiterModel, passport) {
	dashboardRouter.route('/candidate/:candidateId')
		.get(authenticationCheck,
			function(req, res) {
				res.render('candidateDashboard', {
					errors: req.flash('errors'),
					message: req.flash('message'),
					user: req.user
				})
			})

	dashboardRouter.route('/recruiter/:recruiterId')
		.get(authenticationCheck,
			function(req, res) {
				res.render('recruiterDashboard', {
					errors: req.flash('errors'),
					message: req.flash('message'),
					user: req.user
				})
			})



	return dashboardRouter;
}

