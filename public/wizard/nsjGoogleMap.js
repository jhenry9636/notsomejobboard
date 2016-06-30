(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjGoogleMap', nsjGoogleMap)

  function nsjGoogleMap(mapsService) {
    return {
      controller: ctrl,
      templateUrl: '/wizard/nsjGoogleMap.html'
    }
  }

  ctrl.$inject = ['mapsService']

  function ctrl(mapsService) {
    mapsService.initMap();
    mapsService.initAutoComplete();
  }


})()