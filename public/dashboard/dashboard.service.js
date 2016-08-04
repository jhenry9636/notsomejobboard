(function() {
  'use strict'

  angular.module('dashboard')
    .factory('dashboardService', dashboardService)

  dashboardService.$inject = ['$q', '$http'];

  function dashboardService($q, $http) {

    var service = {};

    service.selectedIndex = null;
    service.getAll = getAll;
    service.setAccepted = setAccepted;
    service.getSelectedIndex = getSelectedIndex;
    service.setSelectedIndex = setSelectedIndex;

    function setAccepted(query) {
      var deffered = $q.defer();

      //TODO: On setAccepted match sender id with current user
      $http.post('/api/request/update', query)
        .then(function(developer) {
          deffered.resolve(developer)
        })
        .catch(function(error) {
          deffered.reject(error)
        });

      return deffered.promise;
    }
    

    function getAll(query) {
      var deffered = $q.defer();

      $http.get('/api/request/' + window.user.currentUser, query)
        .then(function(developer) {
          deffered.resolve(developer)
        })
        .catch(function(error) {
          deffered.reject(error)
        });

      return deffered.promise;

    }

    function getSelectedIndex() {
      return service.selectedIndex;
    }

    function setSelectedIndex(index) {
      service.selectedIndex = index;
    }

    function deleteRequest(requestId) {
      dashboardService.deleteRequest(requestId)
        .then(function() {

        });
    }

    return service;

  }
})()