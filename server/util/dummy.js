var mongoose = require('mongoose');
var Recruiter = mongoose.model('Recruiter');
var Developer = mongoose.model('Developer');
var Request = mongoose.model('Request');
var async = require('async');
var faker = require('faker');



module.exports = function() {

  function DeveloperFactory() {
    var obj = {};

    obj.givenName = faker.name.firstName();
    obj.familyName = faker.name.lastName();
    obj.primaryEmail = faker.internet.email();
    obj.password = getPassword();
    obj.compType = getCompType();
    obj.compMin = getCompMin();
    obj.primaryPhone = faker.phone.phoneNumber();
    obj.hasVerifiedEmail = true;
    
    return obj
  }


  function RecruiterFactory() {
    var obj = {};

    obj.givenName = faker.name.firstName();
    obj.familyName = faker.name.lastName();
    obj.primaryEmail = faker.internet.email();
    obj.password = getPassword();
    obj.compType = getCompType();
    obj.compMin = getCompMin();
    obj.primaryPhone = faker.phone.phoneNumber();
    obj.hasVerifiedEmail = true;

    return obj
  }


  var stack = [
    function (callback) {

      callback(null, "1")
    },
    function (callback) {

      callback(null, "2")
    },
    function (callback) {

      callback(null, "3")
    }
  ]

  async.series(stack, function(err, results) {

    console.log(results)
  })

}