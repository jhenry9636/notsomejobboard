

module.exports = function(RecruiterModel, passport, nodemailer) {

	return {
		create: function(req, res) {
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

		},
		get: function(req, res) {
			RecruiterModel.find()
				.exec(function(err, recruiter) {
					if(err) throw err
					res.status(200).json(recruiter)
				})
		},
		getOne: function(req, res) {
			RecruiterModel.findById(req.params.recruiterId, function(err, recruiter) {
				if(err) throw err
				res.send(recruiter);
			})
		},
		update: function(req, res) {
			RecruiterModel.findById(req.params.recruiterId, function(err, recruiter) {
				if(err) throw err

				if(req.body.firstName) {
					recruiter.firstName = req.body.firstName
				}
				if(req.body.lastName) {
					recruiter.lastName = req.body.lastName
				}
				if(req.body.emailAddress) {
					recruiter.emailAddress = req.body.emailAddress
				}
				if(req.body.position) {
					recruiter.position = req.body.position.split(',')
				}
				if(req.body.technologies) {
					recruiter.technologies = req.body.technologies.split(',')
				}
				if(req.body.emplyType) {
					recruiter.pay.emplyType = req.body.emplyType
				}
				if(req.body.comp) {
					recruiter.pay.comp = req.body.comp
				}
				if(req.body.password) {
					recruiter.password = recruiter.generateHash(req.body.password)
				}
				recruiter.save(function(err, recruiter) {
					if(err) throw err
					res.send(recruiter);
				})
			})
		},
		delete: function(req, res) {
			RecruiterModel.findById(req.params.recruiterId,
				function(err, recruiter) {
				if(err) throw err
				recruiter.remove(function(err) {
					if(err) throw err
					res.status(204).send('Removed')
				})
			})
		}
	}
}