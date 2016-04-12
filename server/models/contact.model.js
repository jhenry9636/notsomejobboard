var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');


module.exports = function() {

	var now = moment();

	var ContactSchema = new Schema({
		recipient: {
			type: Schema.ObjectId,
			ref: 'Candidate'
		},
		originator: {
			type: Schema.ObjectId,
			ref: 'Recruiter'
		},
		createdAt: {
			type: 'String',
			default : now.valueOf()
		},
		expiresAt: {
			type: 'String',
			default : now.add(5, 'd').valueOf()
		},
		zipCode: {
			type: 'String',
			default: null
		}
	})

	ContactSchema.pre('save', function (next) {
		this.expiresAt = moment(
			new Date().setMilliseconds(this.createdAt)).days(3).valueOf();
		next();
	})

	return mongoose.model('Contact', ContactSchema)
}