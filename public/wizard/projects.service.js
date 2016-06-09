(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('projectsService', projectsService)

  projectsService.$inject = ['$q']

  function projectsService($q) {
    var projects = [];

    var service = {
      projects: projects,
      addProject : addProject,
      removeProject: removeProject
    };

    return service

    function addProject(project) {
      var defer = $q();

      projects.push(project);
      defer.resolve(projects);
    }

    function removeProject(project) {
      var defer = $q();

      projects.splice(projects.indexOf(project), 1);
      defer.resolve(projects);
    }

  }
})()