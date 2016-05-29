(function() {
  'use strict'

  angular.module('nsj.wizard')
    .controller('WizardController', WizardController)

  function WizardController() {
    var vm = this;

    vm.currentStep = 'location';
    vm.hasLocation = false;
    vm.hasComp = false;
    vm.hasTech = false;
    vm.hasProjects = false;
    vm.setLocation = setLocation;
    vm.setComp = setComp;
    vm.setTech = setTech;
    vm.location = ''
    vm.tech = ''
    vm.comp = ''


    function setLocation() {
      vm.hasLocation = true;
      vm.currentStep = 'tech';
    }

    function setComp() {
      vm.hasComp = true;
      vm.currentStep = 'creds';
    }

    function setTech() {
      vm.hasTech = true;
      vm.currentStep = 'comp';
    }


    function setCurrentSlide(slideName) {

    }

  }




})()