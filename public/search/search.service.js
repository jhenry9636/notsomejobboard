(function() {
  'use strict'

  angular.module('search')
    .factory('searchService', recruiterSignupService)

  recruiterSignupService.$inject = ['$q', '$http'];

  function recruiterSignupService($q, $http) {

    var service = {};

    service.save = save;

    function save(recruiter) {

      recruiter.companyState = recruiter.companyState.toUpperCase();

      return $http.post('/signup/recruiter', recruiter)
        .then(success)
        .catch(fail);

      function success(response) {
        console.dir(response)
      };
      function fail(error) {
        console.error('XHR Failed for save.' + error.data);
      }

    }


    return service;

  }
})()