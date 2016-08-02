(function() {
  'use strict'

  angular.module('dashboard')
    .factory('dashboardService', dashboardService)

  dashboardService.$inject = ['$q', '$http'];

  function dashboardService($q, $http) {

    var service = {};

    service.getAll = getAll;

    function getAll(query) {
      var deffered = $q.defer();

      $http.post('/api/contact', query)
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