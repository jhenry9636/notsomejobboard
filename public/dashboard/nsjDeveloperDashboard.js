(function() {
  'use strict'

  angular.module('dashboard')
    .directive('nsjDeveloperDashboard', nsjDeveloperDashboard)

  function nsjDeveloperDashboard() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/dashboard/dashboard.html',
      controller: ctrl,
      controllerAs: 'vm'
    }

  }

  function ctrl() {
    var vm = this;

    vm.test = function() {
      alert('test')
    }
  }


}())