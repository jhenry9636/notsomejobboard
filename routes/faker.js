var express = require('express');
var fakerRouter = express.Router();
var nodemailer = require('nodemailer');
var faker = require('faker');
var _ = require('lodash');

faker.locale = "en";

module.exports = function(CandidateModel, RecruiterModel, ContactModel) {

	fakerRouter.route('/:fakeRecoudCount')
		.get(function(req, res) {

			var candidateArr = [];
			var recuiterArr = [];
			var contactArr = [];

			function getCandidateAndRecruiterIds(cb) {
				CandidateModel.find()
					.select('_id')
					.exec(function(err, candiates) {
						if(err) throw err;
						RecruiterModel.find()
							.select('_id')
							.exec(function(err, recruiters) {
								if(err) throw err;
								console.log('Ids have been fetched ...')
								cb(candiates, recruiters)
							})
					})
			}





			for(var i = 0; i<=req.params.fakeRecoudCount; i+=1) {
				candidateArr.push({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					userName: faker.internet.userName(),
					password: 1234,
					emailAddress: faker.internet.email(),
					compensation: faker.finance.amount(),
					location: faker.address.streetAddress() + ' ' + faker.address.city(),
					stack: faker.lorem.words(),
					emailVerified: true

				})

				recuiterArr.push({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					userName: faker.internet.userName(),
					password: 1234,
					emailAddress: faker.internet.email(),
					companyName: faker.company.companyName(),
					emailVerified: true
				})




			}
			CandidateModel.create(candidateArr, function(err, candidates) {
				if(err) throw err;
				console.log('Yippee! Total of '+candidates.length+' candidates were saved.')
				RecruiterModel.create(recuiterArr, function(err, recruiters) {
					if(err) throw err;
					console.log('Yippee! Total of '+recruiters.length+' recruiters were saved.')
					getCandidateAndRecruiterIds(function(candidatesIds, recruiterIds) {


						for(var i = 0; i<=200; i+=1) {
							contactArr.push({
								recipient: _.sample(candidatesIds)._id,
								originator: _.sample(recruiterIds)._id
							})
						}

						ContactModel.create(contactArr, function(err, contacts) {
							if(err) throw err
							console.log('Yippee! Total of '+contacts.length+' contacts were saved.')
							res.end();
						})

					})
				})
			})
		})

	fakerRouter.route('/clear')
		.get(function(req, res) {
			CandidateModel.remove({}, function(err) {
				if(err) throw err
				RecruiterModel.remove({}, function(err) {
					if(err) throw err
					ContactModel.remove({}, function(err) {
						if(err) throw err
						res.send('All done!')
					})
				})
			})
		})

	return fakerRouter
}

