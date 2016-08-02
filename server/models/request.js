var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');

var requestSchema = new Schema({
  recipient: {
    type : Schema.ObjectId,
    ref : 'Developer',
    required: [true, 'Recipient ID field is required']
  },
  sender: {
    type : Schema.ObjectId,
    ref : 'Recruiter',
    required: [true, 'Sender ID field is required']
  },
  location: {
    type: [Number],
    required: true
  },
  compType: {
    type: String,
    required: [true, 'Comp type is required'],
    enum: validator.compType
  },
  compMax: {
    type: String,
    required: [true, 'Comp max is required'],
    validate: validator.requiredField
  },
  technologies: {
    type: [],
    required: [true, 'Technologies is required']
  },
  clientName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

return mongoose.model('Request', requestSchema)