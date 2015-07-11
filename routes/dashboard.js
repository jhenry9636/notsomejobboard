var express = require('express');
var dashboardRouter = express.Router();
var authenticationCheck = require('../util/util.js')


module.exports = function(CandidateModel, RecruiterModel, passport) {
	dashboardRouter.route('/candidate/:candidateId')
		.get(authenticationCheck,
			function(req, res) {
				res.render('candidateDashboard', {
					message: req.flash('message'),
					user: req.user
				})
			})	

	return dashboardRouter;
}

