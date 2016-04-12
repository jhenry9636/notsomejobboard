var express = require('express');
var contactRequestRouter = express.Router();
var nodemailer = require('nodemailer');
var _ = require('lodash');
var authenticationCheck = require('../util/util.js')


module.exports = function(app, ContactModel, CandidateModel) {

	//TODO: Finish this.

	app.get('/contacts/', authenticationCheck, function(req, res) {
			ContactModel.find({})
				.select('-originator.isRecruiter')
			    .populate('originator recipient', 'firstName lastName companyName _id')
				.exec(function(err, contacts) {
					res.send(contacts)
				})
		})

	app.get('/contacts/:candidateId', authenticationCheck, function(req, res) {
			var query = ContactModel.find({recipient: req.params.candidateId})
			query.populate('originator', 'firstName lastName companyName _id')
			query.select('-recipient -_id -originator.isRecruiter')
			query.exec(function(err, requests) {
					if(err) throw err
					res.send(requests)
			})
		})

	app.get('/contact/:candidateId', authenticationCheck, function(req, res) {
			CandidateModel.findById(req.params.candidateId, function(err, candidate) {
				console.log(req.user)
				// candidate.contactRequests.push(new ContactModel({

				// }))
			})		

		})

	return app
}

