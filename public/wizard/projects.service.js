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
      var deferred = $q.defer();

      projects.push(angular.copy(project));
      deferred.resolve(projects);
      console.log(projects)
      return deferred.promise;
    }

    function removeProject(project) {
      var deferred = $q.defer();

      projects.splice(projects.indexOf(project), 1);
      deferred.resolve(projects);
      console.log(projects)
      return deferred.promise;
    }

  }
})()