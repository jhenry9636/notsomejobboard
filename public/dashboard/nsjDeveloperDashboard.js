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

  ctrl.$inject = ['dashboardService']

  function ctrl(dashboardService) {
    var vm = this;
    
    vm.getAll = getAll;


    function getAll() {
      dashboardService.getAll()
        .then(function(response) {
          vm.requests = response.data.collection;
        })
    }

    getAll()

  }


}())