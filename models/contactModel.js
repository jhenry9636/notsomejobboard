var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');


module.exports = function() {

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
			default : moment().valueOf()
		},
		expiresAt: {
			type: 'String'
		}
	})

	ContactSchema.pre('save', function (next) {
		this.expiresAt = moment(
			new Date().setMilliseconds(this.createdAt)).days(3).valueOf();
		next();
	})

	return mongoose.model('Contact', ContactSchema)
}