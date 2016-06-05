(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjWizard', nsjWizard)

  function nsjWizard() {

    return {
      link: link,
      scope: true,
      templateUrl: '/wizard/wizard.html',
      controller: WizardController,
      controllerAs: 'vm'
    }

    function link($scope, element, attrs, controllers) {
      console.log($scope)
    }


  }

  WizardController.$inject = ['wizardService'];

  function WizardController(wizardService) {
    var vm = this;


    vm.currentStep = wizardService.currentStep;
    vm.setCurrentStep = wizardService.setCurrentStep;
    vm.hasLocation = wizardService.hasLocation;
    vm.hasComp = wizardService.hasComp;
    vm.hasTech = wizardService.hasTech;
    vm.hasProjects = wizardService.hasProjects;
    vm.shouldShowIndicator = wizardService.shouldShowIndicator;
    vm.goToLocation = wizardService.goToLocation;
    vm.goToComp = wizardService.goToComp;
    vm.goToTech = wizardService.goToTech;
    vm.goToProjects = wizardService.goToProjects;
    vm.setLocation = wizardService.setLocation;
    vm.setComp = wizardService.setComp;
    vm.setTech = wizardService.setTech;
    vm.setProjects = wizardService.setProjects;
    vm.location = wizardService.location;
    vm.tech = wizardService.tech;
    vm.comp = wizardService.comp;
    
    wizardService.set

    vm.setLocation = function() {
      wizardService.setCurrentStep('tech');
      vm.currentStep = wizardService.currentStep;
      vm.hasLocation = wizard.hasLocation;
      vm.currentStep = wizardService.currentStep;
      vm.shouldShowIndicator = wizardService.shouldShowIndicator;
      vm.progressWidth = wizardService.progressWidth;
    }


  }


})()