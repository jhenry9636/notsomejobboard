var express = require('express');
var verifyRouter = express.Router();
var nodemailer = require('nodemailer');


module.exports = function(CandidateModel) {
	verifyRouter.route('/candidate').get(function(req, res) {
		console.log('unique?'+req.query.token)
		CandidateModel.findOne({authToken: req.query.token}, function(err, candidate) {
			if(err) throw err
			candidate.isAuthenticated = true;
			candidate.save(function(err, candidate) {
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
				    to: candidate.emailAddress,
				    subject: 'Your email has been confirmed.',
				    html: 'Great to have you abroad.'
				}, function(err) {
					if(err) throw err
					req.flash('message', 'Your email was confirmed. Please log in.')
					res.redirect('/login/candidate')
				});
			})
		})
		
	})

	return verifyRouter
}

