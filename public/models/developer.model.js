(function() {
  'use strict'

  angular
    .module('nsj.wizard')
    .factory('developerService', developerService);

  developerService.$inject = ['$http', 'mapsService', '$q'];

  function developerService($http, mapsService, $q) {
    return {
      getAll: getAll,
      create: create,
      save: save
    };

    function create(developerObj) {
      var radius = developerObj.locationRadius * 1000;

      var Developer = function(obj) {
        this.givenName = obj.givenName;
        this.familyName = obj.familyName;
        this.primaryEmail = obj.primaryEmail;
        this.primaryPhone = obj.primaryPhone;
        this.password = obj.password;
        this.projects = obj.projects;
        this.locationName = obj.locationName;
        this.note = obj.note;
        this.locationRadius = radius;
        this.locationCoords = obj.locationCoords;
        this.locationPolygon =
          mapsService.generateGeoJSONCircle(obj.locationCoords, radius, 20)
        this.compType = obj.fulltimeSelected ? 'fulltime' : 'hourly';
        this.compMin =
          obj.fulltimeSelected ? obj.compFt : obj.compHr;
      };

      var developer = new Developer(developerObj);

      return developer;
    }

    function save(developer) {
      var deffered = $q.defer();

      $http.post('/signup/developer', developer)
        .then(function(developer) {
          deffered.resolve(developer)
        })
        .catch(function(error) {
          deffered.reject(error)
        });

      return deffered.promise;


    }

    function getAll() {
      return $http.get('/api/developer')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data.results;
      }

      function fail(error) {
        console.error('XHR Failed for getAll.' + error.data);
      }
    }

  }

})()