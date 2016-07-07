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
      var place = mapsService.getAutocomplete().getPlace();
      mapsService.clearMarkers();
      mapsService.createMarker(place.geometry.location.lat(), place.geometry.location.lng());
      $rootscope.$broadcast('nsj:location', place);
    })
  }


})()