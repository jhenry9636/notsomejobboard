(function () {
  'use strict'


  angular.module('recruiter-signup')
    .directive('nsjRecruiterSignup', nsjRecruiterSignup)

  function nsjRecruiterSignup() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/recruiter-signup/nsjRecruiterSignUp.html',
      controller: RecruiterSignUpController,
      controllerAs: 'vm'
    }

  }

  RecruiterSignUpController.$inject = ['recruiterSignupService'];

  function RecruiterSignUpController(recruiterSignupService) {
    var vm = this;

    vm.recruiter = {}
    vm.recruiter.givenName = null;
    vm.recruiter.familyName = null;
    vm.recruiter.primaryEmail = null;
    vm.recruiter.password = null;
    vm.recruiter.companyName = null;
    vm.recruiter.primaryPhone = null;
    vm.recruiter.companyCity = null;
    vm.recruiter.companyState = null;
    vm.recruiter.companyZip = null;
    vm.signUp = signUp;
    vm.hasErrors = false;
    vm.selectContract = selectContract;
    vm.selectFulltime = selectFulltime;
    vm.fulltimeSelected = false;
    vm.contractSelected = true;

    vm.signin = {};
    vm.signin.primaryEmail = null;
    vm.signin.password = null;

    vm.submitSignin = submitSignin;


    function signUp(isValid) {
      if(!isValid) {
        vm.hasErrors = true;
        return;
      }
      vm.hasErrors = false;
      recruiterSignupService.save(vm.recruiter)
    }

    function submitSignin(isValid) {
      if(!isValid) {
        vm.hasErrors = true;
        return;
      }
      vm.hasErrors = false;
      recruiterSignupService.submitSignin(vm.signin)
    }

    function selectContract() {
      vm.contractSelected = true;
      vm.fulltimeSelected = false;
    }

    function selectFulltime() {
      vm.contractSelected = false;
      vm.fulltimeSelected = true;
    }
    
    function signin() {
      
    }

  }

})()