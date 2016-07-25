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

  ctrl.$inject = ['skillsService']


  function ctrl(skillsService) {
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

    vm.query = {};
    vm.query.compType = null;
    vm.query.compFull = null;
    vm.query.compHr = null;
    vm.query.skills = null;
    vm.query.location = null;


    function submitForm() {
      // if(!isValid) {
      //   vm.hasErrors = true;
      //   return;
      // }
      // vm.hasErrors = false;
      debugger
      console.dir(vm.query)
      // recruiterSignupService.save(vm.query)
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

  }

})()