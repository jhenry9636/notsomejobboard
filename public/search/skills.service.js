(function() {
  'use strict'

  angular.module('search')
    .factory('skillsService', skillsService)

  skillsService.$inject = ['$q']

  function skillsService($q) {
    var skills = ["Angular 2", "Angular Material Design", "Angular.js", "Backbone.js",
      "Bootstrap", "CSS 3", "CSS 3 Animations", "Can.js", "EJS", "ES6", "Ember.js",
      "Foundation", "HTML", "HTML 5", "Handlebars.js", "Jade", "jQuery", "Knockout.js", "LESS", "Lodash.js",
      "Meteor.js", "Mustache.js", "Node.js", "Polymer.js", "React.js", "SASS", "Stylus",
      "TypeScript", "Underscore.js", "Vue.js", "Web Components"];

    var selectedSkills = [];

    var service = {
      skills: skills,
      selectedSkills: selectedSkills,
      addSkill: addSkill,
      removeSkill: removeSkill,
      resetSkills: resetSkills,
      setSelectedSkills: setSelectedSkills,
      getSelectedSkills: getSelectedSkills
    };

    return service

    function addSkill(skill) {
      var deferred = $q.defer();
      selectedSkills.push(skill);
      deferred.resolve(selectedSkills);
      return deferred.promise
    }

    function removeSkill(skill) {
      var index = selectedSkills.indexOf(skill);

      if(index > -1) {
        selectedSkills.splice(index, 1)
      }
    }

    function getSelectedSkills() {
      return selectedSkills
    }

    function resetSkills() {
      var deferred = $q.defer();

      selectedSkills = [];

      deferred.resolve(selectedSkills);
      return deferred.promise
    }

    function setSelectedSkills(skills) {
      selectedSkills = skills
    }

  }
})()