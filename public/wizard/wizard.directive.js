(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjWizard', nsjWizard)

  function nsjWizard() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/wizard/wizard.html',
      controller: WizardController,
      controllerAs: 'vm'
    }

  }

  WizardController.$inject = ['wizardService', 'skillsService', 'projectsService'];

  function WizardController(wizardService, skillsService, projectsService) {

    var vm = this;

    vm.currentStep = wizardService.currentStep;
    vm.nextStep = nextStep;
    vm.previousStep = previousStep;
    vm.setStep = setStep;
    vm.getProgressWidth = getProgressWidth;
    vm.skills = skillsService.skills;
    vm.selectedTech = skillsService.selectedSkills;
    vm.resetSkills = resetSkills;
    vm.addSkill = addSkill;
    vm.removeSkill = removeSkill;
    vm.handleSkillToggle = handleSkillToggle;
    vm.location = '';
    vm.tech = '';
    vm.comp = '';
    vm.projects = projectsService.projects;
    vm.project = {}
    vm.showTechList = false;
    vm.toggleTechList = toggleTechList;
    vm.createHelper = createHelper;
    vm.removeHelper = removeHelper;
    vm.saveEdits = saveEdits;
    vm.isEditing = false;
    vm.cancelEdit = cancelEdit;
    vm.setEditingProjectIndex = setEditingProjectIndex;
    vm.currentEditProject = projectsService.currentEditProject;

    function setStep(newStep) {
      wizardService.setStep(newStep).then(function(step) {
        vm.currentStep = step;
        vm.progressWidth = ((step / 4) * 100) + '%';
      })
    }

    function nextStep() {
      wizardService.nextStep().then(function(step) {
        vm.currentStep = step;
      })
    }

    function previousStep() {
      wizardService.previousStep().then(function(step) {
        vm.currentStep = step;
        vm.progressWidth = ((step / 4) * 100) + '%';
      })
    }

    function handleSkillToggle(skill) {
      if(vm.selectedTech.indexOf(skill) > -1) {
        vm.removeSkill(skill)
      }
      else {
        vm.addSkill(skill)
      }
      vm.tech = skillsService.selectedSkills[0]+', '+skillsService.selectedSkills[1]+' ...';
    }

    function addSkill(skill) {
      skillsService.addSkill(skill).then(function(skills) {
        vm.selectedTech = skills;
      })
    }

    function removeSkill(skill) {
      skillsService.removeSkill(skill).then(function(skills) {
        vm.selectedTech = skills;
      })
    }

    function getProgressWidth() {
       return ((vm.currentStep / 4) * 100) + '%';
    }

    function resetSkills() {
      skillsService.resetSkills().then(function(skills) {
        vm.selectedTech = skills;
      })
    }

    function resetProject() {
      resetSkills();
      vm.tech = '';
      vm.showTechList = false;
      vm.newProject.name = null;
      vm.newProject.client = null;
      vm.newProject.url = null;
      vm.newProject.desc = null;
    }

    function toggleTechList() {
      vm.showTechList = !vm.showTechList;
    }

    function cancelEdit() {
      vm.isEditing = false
    }

    function createHelper(project) {
      projectsService.createHelper(project);
      vm.projects = projectsService.projects;
      resetProject();
    }

    function removeHelper(index) {
      projectsService.removeHelper(index);
      vm.projects = projectsService.projects;
    }

    function saveEdits(editingProject) {
      projectsService.saveEdits(editingProject)
    }

    function saveEdits() {
      projectsService.saveEdits()
      vm.isEditing = false;
    }

    function setEditingProjectIndex(index) {
      projectsService.setEditingProjectIndex(index)
      vm.isEditing = true;
    }

  }


})()