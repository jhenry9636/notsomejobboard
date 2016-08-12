(function () {
  'use strict'


  angular.module('search')
    .directive('nsjSearch', nsjSearch)

  function nsjSearch() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/search/search.html',
      controller: ctrl,
      controllerAs: 'vm'
    }

  }

  ctrl.$inject = ['randomGreetingService', 'searchService', 'skillsService', '$rootScope', '$scope']


  function ctrl(randomGreetingService, searchService, skillsService, $rootScope, $scope) {
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
    vm.selectContract = selectContract;
    vm.selectFulltime = selectFulltime;
    vm.fulltimeSelected = true;
    vm.contractSelected = false;
    vm.skills = skillsService.skills;
    vm.selectedSkills = skillsService.selectedSkills
    vm.handleSkillToggle = handleSkillToggle;
    vm.submitForm = submitForm;
    vm.sendRequest = sendRequest;
    vm.errors = {};


    vm.query = {};
    vm.query.compType = null;
    vm.query.compFull = null;
    vm.query.compHr = null;
    vm.query.skills = null;
    vm.query.locationName = null;
    vm.query.locationCoords = null;

    vm.activePanel = 'search';

    vm.developerName = null;

    function submitForm() {


      var query = angular.copy(vm.query);

      if(!isValid()) {
        return
      }
      // TODO: Remove the first and last name from results
      // and create a virtual field.
      delete query.compHr;
      delete query.compFull;
      delete query.locationName;

      query.comp = vm.fulltimeSelected ? vm.query.compFull : vm.query.compHr;
      query.compType = vm.fulltimeSelected ? 'fulltime' : 'contract';

      vm.loading = true;
      searchService.search(query)
        .then(function(result) {
          vm.developers = result.data.collection;
          vm.loading = false;
        })
        .catch(function() {
          vm.loading = false;
        })
    }

    function isValid() {
      var isValid = true;

      vm.errors = {};

      if(vm.fulltimeSelected) {
        if(!vm.query.compFull) {
          isValid = false;
          vm.errors.compFullError = true;
        }
      }

      if(vm.contractSelected) {
        if(!vm.query.compHr) {
          isValid = false;
          vm.errors.compHrError = true;
        }
      }

      if(!vm.selectedSkills.length) {
        isValid = false;
        vm.errors.skillsError = true;
      }

      if(!vm.query.locationName) {
        isValid = false;
        vm.errors.locationError = true;
      }

      return isValid;
    }

    function selectContract() {
      vm.contractSelected = true;
      vm.fulltimeSelected = false;
    }

    function selectFulltime() {
      vm.contractSelected = false;
      vm.fulltimeSelected = true;
    }

    function addSkill(skill) {
      skillsService.addSkill(skill)
      vm.skills = skillsService.skills;
    }

    function removeSkill(skill) {
      skillsService.removeSkill(skill)
      vm.skills = skillsService.skills;
    }

    function handleSkillToggle(skill) {
      if(skillsService.selectedSkills.indexOf(skill) > -1) {
        removeSkill(skill)
      }
      else {
        addSkill(skill)
      }
      vm.query.skills = skillsService.selectedSkills;
    }

    $rootScope.$on('search:location', function($scope, placeObj) {
      $scope.currentScope.$apply(function() {
        vm.query.locationName = placeObj.formatted_address;
        vm.query.locationCoords = [placeObj.geometry.location.lng(),
                                  placeObj.geometry.location.lat()];
      })
    })

    function sendRequest(developer) {
      var request = {};

      request.recipient = developer._id;
      request.sender = window.user.currentUser;
      request.location = vm.query.locationCoords;
      request.compType = vm.fulltimeSelected ? 'fulltime' : 'hourly';
      request.compMax = vm.fulltimeSelected ? vm.query.compFull : vm.query.compHr;
      request.technologies = vm.query.skills;
      request.clientName = vm.query.clientName;

      var name = developer.givenName;


      searchService.sendRequest(request)
        .then(function(response) {
          toastr.info('Contact Request Sent to '+name);
        }, function(error) {
          console.dir(error)
        })

    }
    


  }

})()