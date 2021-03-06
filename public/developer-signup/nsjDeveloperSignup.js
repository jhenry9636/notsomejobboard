(function () {
  'use strict'


  angular.module('developer-signup')
    .directive('nsjDeveloperSignup', nsjDeveloperSignup)

  function nsjDeveloperSignup() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/developer-signup/nsjDeveloperSignUp.html',
      controller: ctrl,
      controllerAs: 'vm'
    }

  }

  ctrl.$inject = ['$window','developerSignupService']

  function ctrl($window, developerSignupService) {
    var vm = this;

    vm.developer = {};
    vm.developer.primaryEmail = null;
    vm.developer.password = null;
    vm.submitSignin = submitSignin;
    vm.serverError = null;

    function submitSignin(isValid) {
      if (!isValid) {
        vm.hasErrors = true;
        return;
      }

      vm.hasErrors = false;
      developerSignupService.submitSignin(vm.developer)
        .then(function () {
          $window.location.assign('/dashboard');
          vm.serverError = null;
        }, function(error) {
          vm.serverError = error.data.reason;
        });
    }

  }
})()