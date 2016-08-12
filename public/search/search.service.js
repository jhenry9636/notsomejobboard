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
    service.getAll = getAll;

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


    function getAll() {
      var deffered = $q.defer();
      console.log('/api/request/recruiter/' + window.user.currentUser)
      $http.get('/api/request/recruiter/' + window.user.currentUser)
        .then(function(requests) {
          service.requests = requests;
          deffered.resolve(requests)
        })
        .catch(function(error) {
          deffered.reject(error)
        });

      return deffered.promise;

    }
    
    return service;

  }
})()