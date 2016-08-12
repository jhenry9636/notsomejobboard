(function() {
  'use strict'

  angular.module('search')
    .factory('searchService', searchService)

  searchService.$inject = ['$q', '$http'];

  function searchService($q, $http) {

    var service = {};

    service.developers = null;
    service.search = search;
    service.sendRequest = sendRequest;

    function sendRequest(request) {
      var deferred = $q.defer();
      
      $http.post('/api/request/add', request)
        .then(success)
        .catch(fail)

      function success(response) {
        deferred.resolve(response)
      };
      function fail(error) {
        deferred.reject(error)
        console.error('XHR Failed for save.' + error.data);
      }

      return deferred.promise
    }


    function search(query) {

      var deferred = $q.defer();

      $http.post('/api/search', query)
        .then(success)
        .catch(fail)

      function success(response) {
        deferred.resolve(response)
      };
      function fail(error) {
        deferred.reject(error)
        console.error('XHR Failed for save.' + error.data);
      }

      return deferred.promise;

    }

    return service;

  }
})()