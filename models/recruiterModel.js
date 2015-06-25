var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RecruiterSchema = new Schema({
	firstName: {
		type: String,
		require: true
	},
	lastName: {
		type: String,
		require: true
	},
	userName: {
		type: String,
		default: this.emailAddress
	},
	relatedReviews: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}],
	emailAddress: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	joinedDate: {
		type: Date,
		default : Date.now()
	},
	companyName: {
		type: String,
		default: null
	}
})

module.exports = mongoose.model('Recruiter', RecruiterSchema)