(function() {
  'use strict'

  angular.module('search')
    .factory('searchService', searchService)

  searchService.$inject = ['$q', '$http'];

  function searchService($q, $http) {

    var service = {};

    service.search = search;

    function search(query) {
      debugger

      return $http.post('/api/search', query)
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