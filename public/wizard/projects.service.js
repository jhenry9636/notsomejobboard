(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('projectsService', projectsService)

  projectsService.$inject = ['$q'];

  function projectsService($q) {
    var projects = [];
    var currentEditProject = {};
    var currentRemoveProject = {};
    var currentEditProjectIndex = null;
    var activeProject = {};


    var service = {
      projects: projects,
      activeProject : activeProject,
      createHelper: createHelper,
      saveEdits: saveEdits,
      removeHelper: removeHelper,
      setActiveProject: setActiveProject,
      currentEditProject: currentEditProject,
      setEditingProjectIndex: setEditingProjectIndex
    };

    return service

    function setActiveProject(project) {
      activeProject = project;
    }

    function setEditingProjectIndex(index) {
      alert(index)
      currentEditProjectIndex = index;
    }

    function saveEdits(project) {
      projects[currentEditProjectIndex].name = project.name;
      projects[currentEditProjectIndex].client = project.client;
      projects[currentEditProjectIndex].url = project.url;
      projects[currentEditProjectIndex].desc = project.desc;
    }

    function removeHelper(index) {
      projects.splice(index, 1)
    }

    function createHelper(project) {
      projects.unshift(angular.copy(project))
    }

  }
})()