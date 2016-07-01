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

  ctrl.$inject = ['mapsService', '$rootScope']

  function ctrl(mapsService, $rootscope) {
    mapsService.initMap();
    mapsService.initAutoComplete();
    mapsService.getAutocomplete().addListener('place_changed', function() {
      $rootscope.$broadcast('nsj:location', mapsService.getAutocomplete().getPlace())
    })
  }


})()