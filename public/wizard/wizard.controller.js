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
    vm.goToProjects = goToProjects;
    vm.setLocation = setLocation;
    vm.setComp = setComp;
    vm.setTech = setTech;
    vm.setProjects = setProjects
    vm.location = ''
    vm.tech = ''
    vm.comp = ''


    function setLocation() {
      vm.hasLocation = true;
      vm.currentStep = 'tech';
      vm.shouldShowIndicator = true;
      $scope.setLocationProgress();
    }

    function setTech() {
      vm.hasTech = true;
      vm.currentStep = 'projects';
      $scope.setTechProgress();
    }

    function setProjects() {
      vm.hasProjects = true;
      vm.currentStep = 'comp';
      $scope.setProjectsProgress();
    }

    function setComp() {
      vm.hasComp = true;
      vm.currentStep = 'creds';
      $scope.setCompProgress();
    }



    function goToLocation() {
      vm.hasLocation = false;
      vm.hasTech = false;
      vm.hasProjects = false;
      vm.hasComp = false;
      vm.currentStep = 'location';
      $scope.setWidth('0%')
    }

    function goToTech() {
      vm.hasTech = false;
      vm.hasComp = false;
      vm.hasProjects = false;
      vm.currentStep = 'tech';
      $scope.setWidth('20%')
    }

    function goToProjects() {
      vm.hasTech = false;
      vm.hasComp = false;
      vm.currentStep = 'tech';
      $scope.setWidth('40%')
    }

    function goToComp() {
      vm.hasComp = false;
      vm.currentStep = 'comp';
      $scope.setWidth('60%')
    }

  }




})()