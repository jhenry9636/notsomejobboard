(function() {
  'use strict'

  angular
    .module('nsj.wizard')
    .factory('developerService', developerService);

  developerService.$inject = ['$http', 'mapsService'];

  function developerService($http, mapsService) {
    return {
      getAll: getAll,
      create: create,
      save: save
    };

    function create(developerObj) {

      var Developer = function(obj) {
        this.givenName = obj.givenName;
        this.familyName = obj.familyName;
        this.primaryEmail = obj.primaryEmail;
        this.password = obj.password;
        this.projects = obj.projects;
        this.locationName = obj.locationName;
        this.locationRadius = obj.locationRadius;
        this.locationCoords = obj.locationCoords;
        this.locationPolygon =
          mapsService.generateGeoJSONCircle(obj.locationCoords, obj.locationRadius, 10)
        this.compType = obj.fulltimeSelected ? 'fulltime' : 'hourly';
        this.compMin =
          obj.fulltimeSelected ? obj.compFt : obj.compHr;
      };

      var developer = new Developer(developerObj);

      return developer;
    }

    function save(developer) {

      return $http.post('/signup/developer', developer)
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