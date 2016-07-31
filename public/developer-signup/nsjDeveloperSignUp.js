(function () {
  'use strict'


  angular.module('developer-signup')
    .directive('nsjDeveloperSignup', nsjDeveloperSignup)

  function nsjDeveloperSignup() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/developer-signup/nsjDeveloperSignup.html',
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

    function submitSignin(isValid) {
      if (!isValid) {
        debugger
        vm.hasErrors = true;
        return;
      }
      
      vm.hasErrors = false;
      developerSignupService.submitSignin(vm.developer)
        .then(function () {
          $window.location.assign('/dashboard');
        })
    }

  }

})()