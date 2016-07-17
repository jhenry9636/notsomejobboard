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

  WizardController.$inject = ['$scope',
                              'wizardService',
                              'skillsService',
                              'projectsService',
                              'developerService',
                              'mapsService',
                              '$rootScope'];

  function WizardController($scope, wizardService, skillsService, projectsService, developerService, mapsService, $rootScope) {

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
    vm.tech = '';
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
    vm.editingProject = {}
    vm.editingProject.name = ''
    vm.editingProject.client = ''
    vm.editingProject.desc = ''
    vm.editingProject.url = ''
    vm.fulltimeSelected = true;
    vm.contractSelected= false;
    vm.selectFulltime = selectFulltime;
    vm.selectContract = selectContract;
    vm.submitForm = submitForm;
    vm.hasErrors = false;

    vm.developer = {};
    vm.developer.givenName = null;
    vm.developer.familyName = null;
    vm.developer.primaryPhone = null;
    vm.developer.primaryEmail = null;
    vm.developer.password = null;
    vm.developer.projects = projectsService.projects;
    vm.developer.locationName = null;
    vm.developer.locationRadius = null;
    vm.developer.locationCoords = null;
    vm.developer.compHr = null;
    vm.developer.compFt = null;
    vm.developer.fulltimeSelected = vm.fulltimeSelected;
    vm.developer.contractSelected = vm.contractSelected;

    vm.slider = {
      options: {
        floor: 5,
        ceil: 80,
        disabled: true,
        translate: function(value) {
          return value + 'mi'
        }
      }
    };


    function setStep(newStep) {
      wizardService.setStep(newStep).then(function() {
        vm.currentStep = newStep;
        vm.progressWidth = ((newStep / 3) * 100) + '%';
      })
    }

    function nextStep(event, isValid) {
      event.preventDefault();
      event.stopPropagation();

      if(!isValid) {
        vm.hasErrors = true;
        return
      }

      wizardService.nextStep().then(function(step) {
        vm.hasErrors = false;
        vm.currentStep = step;
      })
    }

    function previousStep() {
      wizardService.previousStep().then(function(step) {
        vm.currentStep = step;
        vm.hasErrors = false;
        vm.progressWidth = ((step / 3) * 100) + '%';
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
      skillsService.removeSkill(skill)
      vm.selectedTech = skillsService.getSelectedSkills();
    }

    function getProgressWidth() {
       return ((vm.currentStep / 3) * 100) + '%';
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

    function toggleTechList(event) {
      event.preventDefault();
      event.stopPropagation();
      vm.showTechList = !vm.showTechList;
    }

    function cancelEdit() {
      vm.isEditing = false;
      resetProject();
    }

    function createHelper(project, event, isValid) {
      event.preventDefault();
      event.stopPropagation();

      if(!isValid) {
        vm.hasErrors = true;
        return false
      }

      vm.hasErrors = false;

      projectsService.createHelper(project);
      vm.projects = projectsService.getProjects();
      resetProject();
    }

    function removeHelper(index) {
      projectsService.removeHelper(index);
      vm.projects = projectsService.getProjects();
    }

    function saveEdits() {
      vm.editingProject.techUsed = vm.selectedTech;
      projectsService.saveEdits(vm.editingProject)
      resetProject()
      vm.isEditing = false;
      vm.editingProject.name = ''
      vm.editingProject.client = ''
      vm.editingProject.desc = ''
      vm.editingProject.url = ''
    }

    function setEditingProjectIndex(index) {
      var currentlyEditing = projectsService.projects[index];
      projectsService.setEditingProjectIndex(index);
      vm.editingProject.name = currentlyEditing.name
      vm.editingProject.client = currentlyEditing.client
      vm.editingProject.desc = currentlyEditing.desc
      vm.editingProject.url = currentlyEditing.url
      skillsService.setSelectedSkills(currentlyEditing.techUsed)
      vm.selectedTech = skillsService.getSelectedSkills()
      vm.isEditing = true;
    }

    function selectFulltime() {
      vm.fulltimeSelected = true;
      vm.contractSelected= false;
      vm.hasErrors = false;
    }

    function selectContract() {
      vm.fulltimeSelected = false;
      vm.contractSelected= true;
      vm.hasErrors = false;
    }

    function submitForm(isValid) {

      if(!isValid) {
        vm.hasErrors = true;
        return;
      }
      vm.hasErrors = false;
      developerService.save(developerService.create(vm.developer))
    }

    $rootScope.$on('nsj:location', function($scope, placeObj) {
      $scope.currentScope.$apply(function() {
        vm.developer.locationName = placeObj.formatted_address;
        vm.developer.locationRadius = '20';
        vm.developer.locationCoords = [mapsService.getCircleProps().lng,
                                        mapsService.getCircleProps().lat];
        vm.slider.options.disabled = false;
        vm.hasErrors = false;
      })
    })

    $scope.$watch('vm.developer.locationRadius', function(newValue) {
      if(!mapsService.getMap()) {
        return;
      }

      mapsService.setRadius(newValue)
      vm.developer.locationRadius = newValue;
      mapsService.setCenter();
    }, true)

    $scope.$watch('vm.location', function(newValue) {
      if(!newValue) {
        vm.slider.options.disabled = true;
        mapsService.clearMarkers();
      }
    })


    }


})()