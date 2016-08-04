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
    vm.setAccepted = setAccepted;
    vm.setDeclined = setDeclined;

    vm.setToPending = setToPending;
    vm.setToDeclined = setToDeclined;
    vm.setToAccepted = setToAccepted;

    vm.acceptQuery = {};
    vm.acceptQuery.recipientId = window.user.currentUser;
    vm.acceptQuery.setAccepted = null;
    vm.acceptQuery.requestId = null;

    vm.getSelectedIndex = getSelectedIndex;
    vm.setSelectedIndex = setSelectedIndex;
    vm.clearSelectedIndex = clearSelectedIndex;

    vm.activePanel = 'pending'
    vm.filter = {accepted: 0};

    function getSelectedIndex() {
      return dashboardService.getSelectedIndex()
    }

    function setSelectedIndex(index) {
      return dashboardService.setSelectedIndex(index)
    }

    function clearSelectedIndex() {
      return dashboardService.setSelectedIndex(null)
    }

    function getAll() {
      dashboardService.getAll()
        .then(function(response) {
          vm.requests = response.data.collection;
        })
    }
    
    function setAccepted(requestId) {

      vm.acceptQuery.setAccepted = 1;
      vm.acceptQuery.requestId = requestId;

      dashboardService.setAccepted(vm.acceptQuery)
        .then(function(response) {
          vm.clearSelectedIndex();
          vm.requests = response.data.collection;
        })

    }


    function setDeclined(requestId) {

      vm.acceptQuery.setAccepted = 2;
      vm.acceptQuery.requestId = requestId;

      dashboardService.setAccepted(vm.acceptQuery)
        .then(function(response) {
          vm.clearSelectedIndex();
          vm.requests = response.data.collection;
        })

    }

    function setToPending() {
      vm.activePanel = 'pending'
      vm.filter = {accepted: 0};
    }

    function setToAccepted() {
      vm.activePanel = 'accepted'
      vm.filter = {accepted: 1};
    }

    function setToDeclined() {
      vm.activePanel = 'declined'
      vm.filter = {accepted: 2};
    }

    getAll()

  }


}())