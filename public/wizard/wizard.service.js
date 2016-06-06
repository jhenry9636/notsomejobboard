(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('wizardService', wizardService)

  wizardService.$inject = ['$q'];

  function wizardService($q) {

    var steps = [{
      stepName: 'location'
    },{
      stepName: 'tech'
    },{
      stepName: 'projects'
    },{
      stepName: 'comp'
    },{
      stepName: 'creds'
    }];


    var service = {
      steps: steps,
      currentStep: 0,
      setStep: setStep,
      nextStep: nextStep,
      previousStep: previousStep
    }

    return service;

    function nextStep() {
      var deferred = $q.defer();
      var currentStep = service.currentStep+=1;
      deferred.resolve(currentStep)
      return deferred.promise
    }

    function previousStep() {
      var deferred = $q.defer();
      var currentStep = service.currentStep-=1;
      deferred.resolve(currentStep)
      return deferred.promise
    }

    function setStep(index) {
      var deferred = $q.defer();
      service.currentStep = index;
      deferred.resolve(service.currentStep)
      return deferred.promise
    }
    


  }
})()