(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('projectsService', projectsService)

  projectsService.$inject = ['$q', 'skillsService'];

  function projectsService($q, skillsService) {
    var projects = [];
    var currentEditProject = {};
    var currentRemoveProject = {};
    var currentEditProjectIndex = null;
    var activeProject = {};


    var service = {
      projects: projects,
      createHelper: createHelper,
      saveEdits: saveEdits,
      removeHelper: removeHelper,
      setEditingProjectIndex: setEditingProjectIndex,
      getProjects : getProjects
    };

    return service

    function setEditingProjectIndex(index) {
      currentEditProjectIndex = index;
    }

    function saveEdits(project) {
      debugger
      projects[currentEditProjectIndex] = angular.copy(project)
    }

    function removeHelper(index) {
      projects.splice(index, 1)
    }

    function createHelper(project) {
      project.techUsed = skillsService.selectedSkills;
      console.dir(project)
      projects.push(angular.copy(project))
      skillsService.resetSkills();
    }

    function getProjects() {
      return projects.reverse();
    }

  }
})()