(function() {
  'use strict'

  angular.module('nsj.wizard')
    .controller('WizardController', WizardController)

  WizardController.$inject = ['$scope', 'wizardService']

  function WizardController($scope, wizardService) {
    var vm = this;
    
    vm.currentStep = wizardService.currentStep;
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

  }




})()