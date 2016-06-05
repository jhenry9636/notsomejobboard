(function () {
  'use strict'

  angular.module('nsj.wizard.indicator', [])
    .directive('nsjWizardIndicator', nsjWizardIndicator)
  
  function nsjWizardIndicator() {
    return {
      templateUrl: './'
    }
  }
})()