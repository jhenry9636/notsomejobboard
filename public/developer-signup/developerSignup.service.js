(function() {
  'use strict'

  angular.module('developer-signup')
    .factory('developerSignupService', developerSignupService)

  developerSignupService.$inject = ['$q', '$http'];

  function developerSignupService($q, $http) {

    var service = {};

    service.submitSignin = submitSignin;

    function submitSignin(query) {
      var deffered = $q.defer();

      $http.post('/login/developer', query)
        .then(function(developer) {
          deffered.resolve(developer)
        })
        .catch(function(error) {
          deffered.reject(error)
        });

      return deffered.promise;

    }

    return service;

  }
})()