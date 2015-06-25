var express = require('express');
var recruiterRouter = express.Router();


module.exports = function(RecruiterModel) {

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
			recruiter.save(function(err) {
				if(err) throw err
				res.send(recruiter)
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

