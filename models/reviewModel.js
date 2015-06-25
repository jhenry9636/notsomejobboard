var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ReviewSchema = new Schema({
	rating: {
		type: Number,
		require: true,
		min: 1,
		max: 5,
		validator: [function() {
			return (val % .5) % 1 != 0 
		}, 'Value must be in increments of .5']
	},
	employer: {
		type: String
	},
	createdAt: {
		type: Date,
		default : Date.now()
	},
	writtenBy: {
		type: Schema.ObjectId,
		require: true
	},
	recruiterId: {
		type: Schema.ObjectId,
		require: true
	}
})

module.exports = mongoose.model('Review', ReviewSchema)