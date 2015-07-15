var express = require('express');
var contactRequestRouter = express.Router();
var nodemailer = require('nodemailer');
var _ = require('lodash');
var authenticationCheck = require('../util/util.js')


module.exports = function(app, ContactModel) {

	//TODO: Finish this.

	app.get('/contact/:candidateId', authenticationCheck, function(req, res) {
			var query = ContactModel.find({recipient: req.params.candidateId})
			query.populate('originator', 'firstName lastName companyName _id')
			query.select('-recipient -_id -originator.isRecruiter')
			query.exec(function(err, requests) {
					if(err) throw err
					res.send(requests)
			})
		})

	app.post('/contact/', authenticationCheck, function(req, res) {
			var contact = new ContactModel(req.body);
			contact.save(function(err) {
				console.log(err)
				req.flash('message', 'The candidate was sent your request to contact.')
				res.redirect('/dashboard/recruiter/'+req.user._id)
			});
		})

	return app
}

