(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjWizard', nsjWizard)

  function nsjWizard() {

    return {
      link: link,
      scope: true,
      templateUrl: '/wizard/wizard.html',
      controller: 'WizardController',
      controllerAs: 'vm'
    }

    function link($scope, element, attrs, controllers) {

      $scope.setLocationProgress = setLocationProgress
      $scope.setWidth = setWidth;
      $scope.setTechProgress = setTechProgress
      $scope.setCompProgress= setCompProgress

      function setWidth(width) {
        element.find('#wizard-progress').css({
          width: width
        })
      }

      function setLocationProgress() {
        setWidth('25%')
      }

      function setTechProgress() {
        setWidth('50%')
      }

      function setCompProgress() {
        setWidth('75%')
      }
    }


  }




})()