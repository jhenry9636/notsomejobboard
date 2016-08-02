(function() {
  'use strict'

  angular.module('dashboard', [])


  angular.module('dashboard', []).
  filter('dateInMillis', function() {
    return function(dateString) {
      return Date.parse(dateString);
    };
  });

})()


