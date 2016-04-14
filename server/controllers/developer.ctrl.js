var passwordGenerator = require('../common/passwordGenerator.js')();

module.exports = function(CandidateModel, passport, nodemailer) {

	return {
		create: function(req, res) {
			var candidate = new CandidateModel();
			var req = req.body;
			console.log(req.body)
			candidate.firstName = req.firstName
			candidate.lastName = req.lastName
			candidate.emailAddress = req.emailAddress
			// candidate.position = req.position.split(',')
			// candidate.technologies = req.technologies.split(',')
			candidate.pay.emplyType = req.emplyType
			candidate.pay.comp = req.comp
			candidate.password = passwordGenerator.generateHash(req.password)

			candidate.save(function(err, candidate) {
				if(err) throw err
				var transporter = nodemailer.createTransport({
				    service: 'gmail',
				    auth: {
				        user: 'jarrad.henry@gmail.com',
				        pass: 'Welcome!23'
				    }
				});
				transporter.sendMail({
				    from: 'support',
				    to: candidate.emailAddress,
				    subject: 'Please confirm your email address',
				    html: '<a href="http://127.0.0.1:3333/verify/candidate?token='+candidate.authToken+'">Confirm</a>'
				}, function(err) {
					if(err) throw err
				
					res.redirect('/login')

				});

			})
		},
		get: function(req, res) {
			CandidateModel.find()
				.exec(function(err, candidates) {
					if(err) throw err
					res.status(200).json(candidates)
				})
		},
		getOne: function(req, res) {
			CandidateModel.findById(req.params.developId,
				function(err, candidate) {
				 if(err) throw err
				 res.send(candidate);
			})
		},
		update: function(req, res) {
			CandidateModel.findById(
				req.params.candidateId,
				function(err, candidate) {
				if(err) throw err

				if(req.body.firstName) {
					candidate.firstName = req.body.firstName
				}
				if(req.body.lastName) {
					candidate.lastName = req.body.lastName
				}
				if(req.body.emailAddress) {
					candidate.emailAddress = req.body.emailAddress
				}
				if(req.body.position) {
					candidate.position = req.body.position.split(',')
				}
				if(req.body.technologies) {
					candidate.technologies = req.body.technologies.split(',')
				}
				if(req.body.emplyType) {
					candidate.pay.emplyType = req.body.emplyType
				}
				if(req.body.comp) {
					candidate.pay.comp = req.body.comp
				}
				if(req.body.password) {
					candidate.password = candidate.generateHash(req.body.password)
				}

				console.log('mongo')

				candidate.save(function(err, candidate) {
					if(err) throw err
					res.send(candidate);
				})
			})
		},
		delete: function(req, res) {
			CandidateModel.findByIdAndRemove(
				req.params.candidateId,	
				function(err, candidate) {
				if(err) throw err
				res.status(204).send(candidate)
			})
		}
	}
}