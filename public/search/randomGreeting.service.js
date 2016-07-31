(function() {
  'use strict'

  angular.module('search')
    .factory('randomGreetingService', randomGreetingService)


  function randomGreetingService() {

    var service = {};

    var greetings = ['Hi', 'Hello', 'Hey', 'What\'s up', 'Cheers']

    service.getGreeting = getGreeting;

    function getGreeting() {
      return greetings[Math.floor(Math.random()*greetings.length)];
    }

    return service;

  }
})()