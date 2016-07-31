(function() {
  'use strict'

  angular.module('dashboard')
    .factory('currentUserService', currentUserService)

  currentUserService.$inject = ['$window'];

  function currentUserService($window) {

    var service = {};

    service.getCurrentUser = getCurrentUser;
    service.setCurrentUser = setCurrentUser;

    return service;

    function getCurrentUser() {
      JSON.parse($window.localStorage['current-user']);
    }

    function setCurrentUser(userObject) {
      $window.localStorage['current-user'] = JSON.stringify(userObject);
    }

  }
})()