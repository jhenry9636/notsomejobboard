(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjWizard', nsjWizard)

  function nsjWizard() {
    
    return {
      restrict: 'E',
      templateUrl: '/wizard/wizard.html',
      controller: 'WizardController',
      controllerAs: 'vm',
      bindToController: true
    }

  }




})()