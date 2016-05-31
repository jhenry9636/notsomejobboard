(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('wizardService', wizardService)

  function wizardService() {

    var service =  {
      progressWidth: '0%',
      currentStep: 'location',
      hasLocation: false,
      hasComp: false,
      hasTech: false,
      hasProjects: false,
      shouldShowIndicator: false,
      goToLocation: goToLocation,
      goToComp: goToComp,
      goToTech: goToTech,
      goToProjects: goToProjects,
      setLocation: setLocation,
      setComp: setComp,
      setTech: setTech,
      setProjects: setProjects,
      location: '',
      tech: '',
      comp: ''
    }

    return service


    function setLocation() {
      vm.hasLocation = true;
      vm.currentStep = 'tech';
      vm.shouldShowIndicator = true;
      vm.progressWidth = "20%";
    }

    function setTech() {
      vm.hasTech = true;
      vm.currentStep = 'projects';
      vm.progressWidth = "40%"
    }

    function setProjects() {
      vm.hasProjects = true;
      vm.currentStep = 'comp';
      vm.progressWidth = "60%"
    }

    function setComp() {
      vm.hasComp = true;
      vm.currentStep = 'creds';
      vm.progressWidth = "80%"
    }

    function goToLocation() {
      vm.hasLocation = false;
      vm.hasTech = false;
      vm.hasProjects = false;
      vm.hasComp = false;
      vm.currentStep = 'location';
      vm.progressWidth = '0%'
    }

    function goToTech() {
      vm.hasTech = false;
      vm.hasComp = false;
      vm.hasProjects = false;
      vm.currentStep = 'tech';
      vm.progressWidth = '20%'
    }

    function goToProjects() {
      vm.hasTech = false;
      vm.hasComp = false;
      vm.currentStep = 'tech';
      vm.progressWidth = '20%'
    }

    function goToComp() {
      vm.hasComp = false;
      vm.currentStep = 'comp';
      vm.progressWidth = '20%'
    }
  }
})()