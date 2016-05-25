var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');


module.exports = function() {

  var requestSchema = new Schema({
    recipient: {
      type : Schema.ObjectId,
      ref : 'Developer',
      required: true,
      validator: validator.requiredField
    },
    sender: {
      type : Schema.ObjectId,
      ref : 'Recruiter',
      require: true,
      validator: validator.requiredField
    },
    location: {
      type: Schema.ObjectId,
      ref: 'Location',
      require: true,
      validator: validator.requiredField
    },
    compType: {
      type: String,
      require: true,
      enum: validator.compType
    },
    compMax: {
      type: String,
      require: true,
      validate: validator.requiredField
    },
    technologies: {
      type: String,
      require: true,
      validate: validator.requiredField
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  })

	return mongoose.model('Request', requestSchema)
}