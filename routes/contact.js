var express = require('express');
var contactRequestRouter = express.Router();
var nodemailer = require('nodemailer');
var _ = require('lodash');


module.exports = function(app, ContactModel) {

	//TODO: Finish this.

	app.get('/contact/:candidateId', function(req, res) {
			ContactModel.find({recipient: req.params.candidateId},
			function(err, requests) {
					if(err) throw err
					res.send(requests)
			})
		})

	app.post('/contact/', function(req, res) {
			var contact = new ContactModel(req.body);
			contact.save(function(err) {
				if(err) throw err
				res.redirect('/dashboard/recruiter/'+req.user._id)
			});
		})

	return app
}

