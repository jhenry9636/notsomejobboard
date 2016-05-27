var mongoose = require('mongoose');
var Recruiter = mongoose.model('Recruiter');
var Developer = mongoose.model('Developer');
var Request = mongoose.model('Request');
var async = require('async');
var random = require('./random');
var _ = require('lodash');



module.exports = function() {
  
  var locals = {};
  
  var stack = [
    function (callback) {
      Developer.create(random.getRandomDeveloper(22), function(err, developers) {
        if(err) {
          throw err
        }
        locals.developers = developers;
        callback(null)
      })
    },
    function (callback) {
      Recruiter.create(random.getRandomRecruiter(22), function(err, recruiters) {
        if(err) {
          throw err
        }
        locals.recruiters = recruiters;
        callback(null)
      })
    },
    function (callback) {

      var recruiterIds = _.map(locals.recruiters, function(item) {
        return item._id
      })

      var developerIds = _.map(locals.developers, function(item) {
        return item._id
      })

      console.dir(recruiterIds)
      console.dir(developerIds)

      locals.recruiterIds = recruiterIds
      locals.developerIds = developerIds

      console.log('USE THIS :RE:::::::::::::: ' + recruiterIds[0])
      console.log('USE THIS :DEV:::::::::::::: ' + developerIds[0])

      callback(null)
    },
    function(callback) {
      Request.create(random.getRandomRequest(60, locals.recruiterIds, locals.developerIds), function(err, requests) {
        if(err) {
          throw err
        }
        console.log('request' + requests)
        locals.requests = requests;
        callback(null)
      })
    }
  ]

  async.series(stack, function(err, results) {
    //console.log('results::::::::::::')
    var devs = results[0]

  })

}