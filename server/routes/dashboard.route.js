var express = require('express');
var dashboardRouter = express.Router();

module.exports = function(CandidateModel, RecruiterModel, passport) {
	dashboardRouter.route('/candidate')
		.get(function(req, res) {
				res.render('candidateDashboard', {
					errors: req.flash('errors'),
					message: req.flash('message'),
					page: 'candidateDashboard',
					user: req.user
				})
			})

	dashboardRouter.route('/recruiter')
		.get(function(req, res) {
				res.render('recruiterDashboard', {
					errors: req.flash('errors'),
					message: req.flash('message'),
					page: 'recruiterDashboard',
					user: req.user
				})
			})



	return dashboardRouter;
}

