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

    vm.submitForm = submitForm;
    vm.hasErrors = false;

    function submitForm(isValid) {
      if(!isValid) {
        vm.hasErrors = true;
        return;
      }
      vm.hasErrors = false;
      recruiterSignupService.save(vm.recruiter)
    }

  }

})()