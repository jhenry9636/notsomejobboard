(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('wizardService', wizardService)

  function wizardService() {

    var service =  {
      progressWidth: '0%',
      setProgressWidth: setProgressWidth,
      currentStep: 'location',
      setCurrentStep: setCurrentStep,
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
      comp: '',
      progress: 'test'
    }

    return service

    function setProgressWidth(width) {
      service.progressWidth  = width;
      return service.progressWidth;
    }

    function setCurrentStep(currentStep) {
      service.currentStep = currentStep;
      return service.currentStep;
    }

    function setLocation() {
      var defer = $q.defer();

      service.hasLocation = true;
      service.currentStep = 'tech';
      service.shouldShowIndicator = true;
      service.progressWidth = "20%";
      defer.resolve();
      return defer.promise
    }

    function setTech() {
      var defer = $q.defer();

      service.hasTech = true;
      service.currentStep = 'projects';
      service.progressWidth = "40%";
      defer.resolve();
      return defer.promise
    }

    function setProjects() {
      var defer = $q.defer();

      service.hasProjects = true;
      service.currentStep = 'comp';
      service.progressWidth = "60%";
      defer.resolve();
      return defer.promise
    }

    function setComp() {
      var defer = $q.defer();

      service.hasComp = true;
      service.currentStep = 'creds';
      service.progressWidth = "80%";
      defer.resolve();
      return defer.promise
    }

    function goToLocation() {
      var defer = $q.defer();

      service.hasLocation = false;
      service.hasTech = false;
      service.hasProjects = false;
      service.hasComp = false;
      service.currentStep = 'location';
      service.progressWidth = '0%'
      defer.resolve();
      return defer.promise
    }

    function goToTech() {
      var defer = $q.defer();

      service.hasTech = false;
      service.hasComp = false;
      service.hasProjects = false;
      service.currentStep = 'tech';
      service.progressWidth = '20%'
      defer.resolve();
      return defer.promise
    }

    function goToProjects() {
      var defer = $q.defer();

      service.hasTech = false;
      service.hasComp = false;
      service.currentStep = 'tech';
      service.progressWidth = '20%'
      defer.resolve();
      return defer.promise
    }

    function goToComp() {
      var defer = $q.defer();

      service.hasComp = false;
      service.currentStep = 'comp';
      service.progressWidth = '20%'
      defer.resolve();
      return defer.promise
    }
  }
})()