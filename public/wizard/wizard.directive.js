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

      $scope.setLocationProgress = setLocationProgress;
      $scope.setProjectsProgress = setProjectsProgress;
      $scope.setWidth = setWidth;
      $scope.setTechProgress = setTechProgress;
      $scope.setCompProgress= setCompProgress;

      function setWidth(width) {
        element.find('#wizard-progress').css({
          width: width
        })
      }

      function setLocationProgress() {
        setWidth('20%')
      }

      function setTechProgress() {
        setWidth('40%')
      }

      function setProjectsProgress() {
        setWidth('60%')
      }

      function setCompProgress() {
        setWidth('80%')
      }
    }


  }




})()