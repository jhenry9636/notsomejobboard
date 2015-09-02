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
		.post(passport.authenticate('candidate-signup', {
	        successRedirect : '/dashboard/candidate',
	        failureRedirect : '/',
	        failureFlash : true
		}))


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

