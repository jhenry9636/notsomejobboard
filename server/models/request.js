var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');


module.exports = function() {

  var requestSchema = new Schema({
    clientName: {
      type: String
    },
    recipient: {
      type : Schema.ObjectId,
      ref : 'Developer',
      required: true
    },
    sender: {
      type : Schema.ObjectId,
      ref : 'Recruiter',
      require: true
    },
    location: {
      type: Schema.ObjectId,
      ref: 'Location',
      require: true
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

  requestSchema.set('toJSON', {
    transform: function(doc, ret, options) {

      return ret
    }
  })

	return mongoose.model('Request', requestSchema)
}