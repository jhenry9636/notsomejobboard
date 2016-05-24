var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

	var requestSchema

	return mongoose.model('Request', requestSchema)
}