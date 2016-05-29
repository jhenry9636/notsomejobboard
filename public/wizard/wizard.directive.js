(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjWizard', nsjWizard)

  function nsjWizard() {

    return {
      scope: true,
      templateUrl: '/wizard/wizard.html',
      controller: 'WizardController',
      controllerAs: 'vm'
    }


  }




})()