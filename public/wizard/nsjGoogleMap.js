(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjGoogleMap', nsjGoogleMap)

  function nsjGoogleMap(mapsService) {
    return {
      controller: ctrl,
      scope: {

      },
      templateUrl: '/wizard/nsjGoogleMap.html'
    }
  }

  ctrl.$inject = ['mapsService']

  function ctrl(mapsService) {
    mapsService.init();

    var options = {
      types: ['geocode'],
      componentRestrictions: {country: "us"}
    };

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options)


    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      var map = mapsService.getMap();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();


      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        map.panTo({lat: lat, lng: lng})
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    })

  }

})()