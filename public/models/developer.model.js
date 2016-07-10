(function() {
  'use strict'

  angular
    .module('nsj.wizard')
    .factory('developerService', developerService);

  developerService.$inject = ['$http'];

  function developerService($http) {
    return {
      getAll: getAll,
      create: create
    };

    function create(developerObj) {

      var Developer = function(obj) {
        this.givenName = obj.givenName;
        this.familyName = obj.familyName;
        this.primaryPhone = obj.primaryPhone;
        this.primaryEmail = obj.primaryEmail;
        this.password = obj.password;
        this.projects = obj.projects;
        this.location = obj.location;
        this.compType = obj.compType;
        this.compMin = obj.compMin;
      };

      var developer = new Developer(developerObj)

      return developer;
    }

    function save(developer) {
      return $http.post('/api/developer')
        .then(success)
        .catch(fail);

      function success(response) {
        console.dir(response)
      };
      function fail(error) {
        console.error('XHR Failed for save.' + error.data);
      }

    }

    function getAll() {
      return $http.get('/api/developer')
        .then(success)
        .catch(fail);

      function success(response) {
        debugger
        return response.data.results;
      }

      function fail(error) {
        console.error('XHR Failed for getAll.' + error.data);
      }
    }
  }







})()