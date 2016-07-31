(function() {
  'use strict'

  angular.module('recruiter-signup')
    .factory('recruiterSignupService', recruiterSignupService)

  recruiterSignupService.$inject = ['$q', '$http'];

  function recruiterSignupService($q, $http) {

    var service = {};

    service.save = save;
    service.submitSignin = submitSignin;

    function save(recruiter) {
      var deffered = $q.defer();

      recruiter.companyState = recruiter.companyState.toUpperCase();

      $http.post('/signup/recruiter', recruiter)
        .then(function(recruiter) {
          deffered.resolve(recruiter)
        })
        .catch(function(error) {
          deffered.reject(error)
        });
      
      return deffered.promise;
    }

    function submitSignin(query) {
      var deffered = $q.defer();

      $http.post('/login/recruiter', query)
        .then(function(recruiter) {
          deffered.resolve(recruiter)
        })
        .catch(function(error) {
          deffered.reject(error)
        });

      return deffered.promise;

    }

    return service;

  }
})()