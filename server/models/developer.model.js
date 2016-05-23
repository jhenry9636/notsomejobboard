var mongoose = require('mongoose');
var candidateSchema = mongoose.Schema;

module.exports = function() {
	return mongoose.model('Candidate', candidateSchema)
}