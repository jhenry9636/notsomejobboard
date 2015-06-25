var mongoose = require('mongoose');
var Schema = mongoose.Schema

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
	joinedDate: {
		type: 'String',
		default : Date.now()
	}
})

module.exports = mongoose.model('Candidate', CandidateSchema)