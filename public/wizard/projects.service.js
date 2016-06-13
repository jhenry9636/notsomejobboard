(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('projectsService', projectsService)

  projectsService.$inject = ['$q'];

  function projectsService($q) {
    var projects = [];
    var currentEditProject = {};
    var currentRemoveProject = {};
    var currentnewProject = {};
    var activeProject = {};


    var service = {
      projects: projects,
      activeProject : activeProject,
      createHelper: createHelper,
      editingHelper: editingHelper,
      removeHelper: removeHelper,
      setActiveProject: setActiveProject
    };

    return service

    function setActiveProject(project) {
      activeProject = project;
    }

    function editingHelper(index) {
      var currentEditProject = projects[index];

      currentEditProject.name = project.name;
      currentEditProject.client = project.client;
      currentEditProject.url = project.url;
      currentEditProject.desc = project.desc;
    }

    function removeHelper(index) {
      projects
      projects.splice(index, 1)
    }

    function createHelper(project) {
      projects.unshift(angular.copy(project))
    }



  }
})()