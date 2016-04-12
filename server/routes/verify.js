var express = require('express');
var verifyRouter = express.Router();
var nodemailer = require('nodemailer');


module.exports = function(CandidateModel, RecruiterModel) {
	verifyRouter.route('/candidate').get(function(req, res, next) {
		CandidateModel.findOne({authToken: req.query.token}, function(err, candidate) {
			if(err) throw err
			if(!candidate) {
				console.warn('This token could not be verified ' + req.query.token)
				req.flash('message', 'There was an error. Please try again later.')
				return res.redirect('/');
			}

			if(candidate.emailVerified) {
				req.flash('message', 'You have already been authenticated. Please log in.')
				return res.redirect('/login')
			}

			candidate.emailVerified = true;
			candidate.save(function(err, candidate) {
				if(err) throw err
				var transporter = nodemailer.createTransport({
				    service: 'gmail',
				    auth: {
				        user: 'jarrad.henry@gmail.com',
				        pass: 'today!11'
				    }
				});
				transporter.sendMail({
				    from: 'support',
				    to: candidate.emailAddress,
				    subject: 'Your email has been confirmed.',
				    html: 'Great to have you abroad.'
				}, function(err) {
					if(err) throw err

					req.flash('message', 'Your email was confirmed. Please log in.')
					res.redirect('/login')
				});
			})
		})
		
	})


	verifyRouter.route('/recruiter').get(function(req, res, next) {
		RecruiterModel.findOne({authToken: req.query.token}, function(err, recruiter) {
			if(err) throw err
			if(!recruiter) {
				console.warn('This token could not be verified ' + req.query.token)
				req.flash('message', 'There was an error. Please try again later.')
				return res.redirect('/');
			}

			if(recruiter.emailVerified) {
				req.flash('message', 'You have already been authenticated. Please log in.')
				return res.redirect('/login')
			}
			
			recruiter.emailVerified = true;
			recruiter.save(function(err, recruiter) {
				if(err) throw err
				var transporter = nodemailer.createTransport({
				    service: 'gmail',
				    auth: {
				        user: 'jarrad.henry@gmail.com',
				        pass: 'welcome!23'
				    }
				});
				transporter.sendMail({
				    from: 'support',
				    to: recruiter.emailAddress,
				    subject: 'Your email has been confirmed.',
				    html: 'Great to have you abroad.'
				}, function(err) {
					if(err) throw err
					req.flash('message', 'Yay!, your email was confirmed! Please log in.')
					res.redirect('/login')
				});
			})
		})
		
	})

	return verifyRouter
}

