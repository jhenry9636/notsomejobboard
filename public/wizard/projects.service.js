(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('projectsService', projectsService)

  projectsService.$inject = ['$q'];

  function projectsService($q) {
    var projects = [];
    var currentEditProject = {
      name: null,
      client: null,
      url: null,
      desc: null
    };
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
      currentEditProjectIndex: currentEditProjectIndex,
      setEditingProjectIndex: setEditingProjectIndex,
      getCurrentlyEditingProject: getCurrentlyEditingProject
    };

    return service

    function setActiveProject(project) {
      console.log(project)
      activeProject = project;
    }

    function setEditingProjectIndex(index) {
      currentEditProjectIndex = index;
    }

    function getCurrentlyEditingProject() {
      return projects[currentEditProjectIndex]
    }

    function saveEdits(project) {
      console.log(projects[currentEditProjectIndex])
      projects[currentEditProjectIndex]
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