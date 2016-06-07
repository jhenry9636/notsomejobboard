(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjFadeIndicator', nsjFadeIndicator)

    function nsjFadeIndicator() {
      return {
        link: link,
        scope: true
      }
    }

  function link(scope, el, attrs) {
    scope.$watch('vm.progress', function() {
      console.log(scope)
    })
  }

})()