(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('mapsService', mapsService)

  mapsService.inject = ['$q']

  function mapsService($q) {
    var circle, point;

    var service = {
      map: null,
      autocomplete: null,
      getMap: getMap,
      setMap: setMap,
      getAutocomplete: getAutocomplete,
      setAutocomplete: setAutocomplete,
      initMap: initMap,
      initAutoComplete: initAutoComplete,
      setMap: setMap,
      createMarker: createMarker,
      point : point,
      circle: circle,
      clearMarkers: clearMarkers
    }

    return service


    function setMap(map) {
      service.map = map;
    }

    function getMap() {
      return service.map
    }

    function createMarker(lat, lng) {
      var pos,
          markers = [];

      pos = new google.maps.LatLng(lat, lng);

      service.point = new google.maps.Marker({
        position: pos,
        map: getMap()
      });

      markers.push(point);
      
      service.circle = new google.maps.Circle({
        center: pos,
        map: getMap(),
        strokeColor: '#F0F4F9',
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: '#F0F4F9',
        fillOpacity: 0.5,
        radius: kmRadius * 1000
      });

      markers.push(circle);
    }

    function initAutoComplete() {
      var options = {
        types: ['geocode'],
        componentRestrictions: {country: "us"}
      };

      setAutocomplete(new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options));


      getAutocomplete().addListener('place_changed', function() {
        var place = service.autocomplete.getPlace();

        if(place.geometry) {
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();


          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            getMap().fitBounds(place.geometry.viewport);
            getMap().panTo({lat: lat, lng: lng})
            createMarker(lat, lng)
            getMap().setZoom(8);
          } else {
            getMap().setCenter(place.geometry.location);
            getMap().setZoom(17);
          }

          function createMarker(lat, lng) {
            var pos = new google.maps.LatLng(lat, lng);
            
            service.point = new google.maps.Marker({
              position: pos,
              map: getMap()
            });
            var markers = [];

            var kmRadius = 40;

            markers.push(marker);

            service.circle = new google.maps.Circle({
              center: pos,
              map: getMap(),
              strokeColor: '#000',
              strokeWeight: 2,
              strokeOpacity: 0.5,
              fillColor: '#f0f0f0',
              fillOpacity: 0.5,
              radius: kmRadius * 1000
            });
            markers.push(marker);
          }
        }

      })

    }

    function initMap() {
      var mapOptions = {
        center: new google.maps.LatLng(37.773972, -122.431297),
        zoom: 9,
        disableDefaultUI: true
      }

      this.setMap(new google.maps.Map(document.getElementById('map'), mapOptions));
    }

    function getAutocomplete() {
      return service.autocomplete
    }

    function setAutocomplete(autocomplete) {
      return service.autocomplete = autocomplete;
    }

    function clearMarkers() {
      service.circle;
      service.point;
      debugger
    }


  }
})()