var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var CandidateSchema = new Schema({
	firstName: {
		type: 'String',
		require: true
	},
	lastName: {
		type: 'String',
		require: true
	},
	userName: {
		type: 'String',
		default: this.emailAddress
	},
	emailAddress: {
		type: 'String',
		require: true
	},
	password: {
		type: 'String',
		require: true
	},
	reviewsWritten: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}],
	location: {
		type: 'String',
		require: true
	},
	stack: {
		type: ['String'],
		require: true
	},
	compensation: {
		type: 'String',
		require: true
	},
	joinedAt: {
		type: 'String',
		default : Date.now()
	}
})

CandidateSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Candidate', CandidateSchema)