var express = require('express');
var fakerRouter = express.Router();
var nodemailer = require('nodemailer');
var faker = require('faker')

faker.locale = "en";

module.exports = function(CandidateModel, RecruiterModel) {

	fakerRouter.route('/:fakeRecoudCount')
		.get(function(req, res) {

			var candidateArr = [];
			var recuiterArr = [];
			for(var i = 0; i<=req.params.fakeRecoudCount; i+=1) {
				candidateArr.push({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					userName: faker.internet.userName(),
					password: 123,
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
					password: 123,
					emailAddress: faker.internet.email(),
					companyName: faker.company.companyName(),
					emailVerified: true
				})

			}

			CandidateModel.create(candidateArr, function(err) {
				if(err) throw err;
				RecruiterModel.create(recuiterArr, function(err) {
					if(err) throw err;
					res.send('recruiter and candidates made.')
				})
			})
		})


	return fakerRouter
}

