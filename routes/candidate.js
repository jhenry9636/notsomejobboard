var express = require('express');
var candidateRouter = express.Router();


module.exports = function(CandidateModel, passport, nodemailer) {

	candidateRouter.route('/')
		.get(function(req, res) {
			CandidateModel.find()
				.exec(function(err, candidates) {
					if(err) throw err
					res.status(200).json(candidates)
				})
		})
		.post(function(req, res) {
			var candidate = new CandidateModel(req.body);
			candidate.save(function(err, candidate) {
				if(err) throw err
				
				var transporter = nodemailer.createTransport({
				    service: 'gmail',
				    auth: {
				        user: 'jarrad.henry@gmail.com',
				        pass: 'welcome!23'
				    }
				});
				console.log(candidate.emailAddress)
				transporter.sendMail({
				    from: 'support',
				    to: candidate.emailAddress,
				    subject: 'Please confirm your email address',
				    html: '<a href="http://127.0.0.1:3333/verify/candidate?token='+candidate.authToken+'></a>'
				}, function(err) {
					if(err) throw err
					
					res.redirect('/confirm')

				});

			})
		})


	candidateRouter.route('/:candidateId')
		.get(function(req, res) {
			var id = req.params.candidateId;

			CandidateModel.findById(id, function(err, candidate) {
				if(err) throw err
				res.send(candidate);
			})
		})

		.delete(function(req, res) {
			var id = req.params.candidateId;

			CandidateModel.findById(id, function(err, candidate) {
				if(err) throw err
				candidate.remove(function(err) {
					if(err) throw err
					res.status(204).send('Removed')
				})
			})
		})
	return candidateRouter
}

