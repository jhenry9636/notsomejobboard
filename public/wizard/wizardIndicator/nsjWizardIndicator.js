(function () {
  'use strict'

  angular.module('nsj.wizard.indicator', [])
    .directive('nsjWizardIndicator', nsjWizardIndicator)
  
  function nsjWizardIndicator() {
    return {
      templateUrl: './wizard.html',
      scope: {
        
      },
      controller: wizardIndicatorCtrl,
      controllerAs: vm
    }
  }

  function wizardIndicatorCtrl() {

  }
})()