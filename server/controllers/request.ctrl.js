var mongoose = require('mongoose');
var Request = mongoose.model('Request')


exports.add = function(req, res) {
  var userData = req.body;
  var request = new Request();

  request.recipient = userData.recipient;
  //TODO: Set request.sender back to req.user._id
  request.sender = userData.sender;
  //request.sender = req.user._id;
  request.location = userData.location;
  request.compType = userData.compType;
  request.compMax = userData.compMax;
  request.technologies = userData.technologies;

  request.save(function(err, request) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true
    })

  })
};


exports.delete = function(req, res) {

  Request.findByIdAndRemove(req.body.id, function(err) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true
    })

  })
};

exports.getByDeveloperId = function(req, res) {
  //TODO: only return validated records
  var query = Request.find(
    {recipient: req.params.developerId},
    '-__v');

  query.populate('sender')
  query.exec(function(err, request) {

    if(!request) {
      return res.status(404).send({
        success: false,
        reason: new Error('Request not found')
      })
    }

    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: request
    })

  })
};

exports.setAccepted = function(req, res) {
  //TODO: only return validated records
  console.log(req.body.requestId)
  var query = Request.findById(req.body.requestId, '-__v');


  query.exec(function(err, request) {

    if(!request) {
      return res.status(404).send({
        success: false,
        reason: 'Request not found'
      })
    }

    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    if(req.body.recipientId == request._id) {
      return res.status(403).send({
        success: false,
        reason: 'You are not the owner of this contact request. Permission denied.'
      })
    }


    if(req.body.setAccepted == 1) {
      request.accepted = 1;
    }
    else {
      request.accepted = 2;
    }

    request.save(function(err, request) {

      if(err) {
        return res.status(400).send({
          success: false,
          reason: err.toString()
        })
      }

      console.dir(request)

      //TODO: only return validated records
      var query = Request.find(
        {recipient: req.body.recipientId},
        '-__v');

      query.populate('sender')
      query.exec(function(err, request) {

        if(!request) {
          return res.status(404).send({
            success: false,
            reason: new Error('Request not found')
          })
        }

        if(err){
          return res.status(400).send({
            success: false,
            reason: err.toString()
          })
        }

        return res.send({
          success: true,
          collection: request
        })

      })

    })

  })
};

exports.getByRecruiterId = function(req, res) {
  //TODO: only return validated records
  var query = Request.find(
    {sender: req.params.recruiterId},
    '-__v');

  query.populate('recipient')
  query.exec(function(err, requests) {

    if(request) {
      return res.status(404).send({
        success: false,
        reason: new Error('Request not found')
      })
    }

    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: requests
    })

  })
};

exports.getAll = function(req, res) {
  //TODO: Make sure all get all routes have authorization
  //TODO: only return validated records
  var query = Request.find(
    null,
    '-__v');

  query.populate('recipient')
  query.populate('sender')
  query.sort({createdAt: 'desc'})
  query.exec(function(err, collection) {
    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: collection
    })
  })
};