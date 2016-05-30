(function() {
  'use strict'

  angular.module('nsj.wizard')
    .controller('WizardController', WizardController)

  function WizardController($scope) {
    var vm = this;

    vm.currentStep = 'location';
    vm.hasLocation = false;
    vm.hasComp = false;
    vm.hasTech = false;
    vm.hasProjects = false;
    vm.shouldShowIndicator = false;
    vm.goToLocation = goToLocation;
    vm.goToComp = goToComp;
    vm.goToTech = goToTech;
    vm.setLocation = setLocation;
    vm.setComp = setComp;
    vm.setTech = setTech;
    vm.location = ''
    vm.tech = ''
    vm.comp = ''


    function setLocation() {
      vm.hasLocation = true;
      vm.currentStep = 'tech';
      vm.shouldShowIndicator = true;
      $scope.setLocationProgress();
    }

    function setComp() {
      vm.hasComp = true;
      vm.currentStep = 'creds';
      $scope.setCompProgress();
    }

    function setTech() {
      vm.hasTech = true;
      vm.currentStep = 'comp';
      $scope.setTechProgress();
    }

    function goToLocation() {
      vm.hasLocation = false;
      vm.hasTech = false;
      vm.hasComp = false;
      vm.currentStep = 'location';
      $scope.setWidth('0%')
    }

    function goToTech() {
      vm.hasTech = false;
      vm.hasComp = false;
      vm.currentStep = 'tech';
      $scope.setWidth('25%')
    }

    function goToComp() {
      vm.hasComp = false;
      vm.currentStep = 'comp';
      $scope.setWidth('50%')
    }

  }




})()