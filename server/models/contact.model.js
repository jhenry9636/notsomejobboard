var mongoose = require('mongoose');

module.exports = function() {
	return mongoose.model('Contact', ContactSchema)
}