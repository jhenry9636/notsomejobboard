var express = require('express');
var recruiterRouter = express.Router();


module.exports = function(RecruiterModel, passport, nodemailer) {

	recruiterRouter.route('/')
		.get(function(req, res) {
			RecruiterModel.find()
				.exec(function(err, recruiter) {
					if(err) throw err
					res.status(200).json(recruiter)
				})
		})
		.post(function(req, res) {
			var recruiter = new RecruiterModel(req.body);
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
				    subject: 'Verify your email.',
				    html: '<a href="http://127.0.0.1:3333/verify/recruiter?token='+recruiter.authToken+'">Confirm</a>'
				}, function(err) {
					if(err) throw err
					req.flash('message', 'You have successfully sign up. Enter your credentials to log in.')
					res.redirect('/login/recruiter')

				});

			})
		})


	recruiterRouter.route('/:recruiterId')
		.get(function(req, res) {
			var id = req.params.recruiterId;

			RecruiterModel.findById(id, function(err, recruiter) {
				if(err) throw err
				res.send(recruiter);
			})
		})
		.delete(function(req, res) {
			var id = req.params.recruiterId;

			RecruiterModel.findById(id, function(err, recruiter) {
				if(err) throw err
				recruiter.remove(function(err) {
					if(err) throw err
					res.status(204).send('Removed')
				})
			})
		})
	return recruiterRouter
}

