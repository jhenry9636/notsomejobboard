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
			var recruiterArr = [];
			var contactArr = [];

			var candidateIds = [];
			var recruiterIds = [];

			CandidateModel.find()
				.exec(function(err, candidates) {

					_.each(candidates, function(candidate) {
						candidateArr.push(candidate._id)
					})

					RecruiterModel.find()
						.exec(function(err, recruiters) {
							_.each(candidates, function(candidate) {
								recruiterArr.push(candidate._id)
							})

							console.log('Candidates', candidateArr)
							console.log('Recruiters', recruiterArr)
							for(var i = 0; i<=req.params.fakeRecoudCount; i+=1) {
								
								candidateArr.push({
									firstName: faker.name.firstName(),
									lastName: faker.name.lastName(),
									userName: faker.internet.userName(),
									emailAddress: faker.internet.email(),
									password: 1234,
									//reviewsWritten: faker.commerce.productAdjective(),
									pay: {
										emplyType: 'contract',
										comp: faker.finance.amount()
									},
									location: faker.address.streetAddress() + ' ' + faker.address.city(),
									emailVerified: true,
									position: faker.name.jobTitle(),
									technologies: faker.lorem.words()
								})

								recruiterArr.push({
									firstName: faker.name.firstName(),
									lastName: faker.name.lastName(),
									userName: faker.internet.userName(),
									emailAddress: faker.internet.email(),
									password: 1234,
									companyName: faker.company.companyName(),
									candidates: [],
									emailVerified: 'yes',
									joinedDate: faker.date.past(),
									isRecruiter: 'yes'
								})

							}

							CandidateModel.create(candidateArr, function(err, candidates) {
								if(err) throw err;
								console.log(err)
								console.log('Yippee! Total of '+candidates.length+' candidates were saved.')
							})

							RecruiterModel.create(recruiterArr, function(err, recruiters) {
								if(err) throw err;
								console.log(err)
								console.log('Yippee! Total of '+recruiters.length+' recruiters were saved.')
							})



						})

				})

		})

	fakerRouter.route('/clear')
		.get(function(req, res) {
			CandidateModel.remove({}, function(err) {
				if(err) throw err
			})
		})

	return fakerRouter
}

