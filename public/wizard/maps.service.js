(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('mapsService', mapsService)

  mapsService.inject = ['$q']

  function mapsService($q) {

    var kmRadius = 20;

    var service = {
      map: null,
      markers: [],
      autocomplete: null,
      getMap: getMap,
      setMap: setMap,
      getAutocomplete: getAutocomplete,
      setAutocomplete: setAutocomplete,
      initMap: initMap,
      initAutoComplete: initAutoComplete,
      setMap: setMap,
      createMarker: createMarker,
      clearMarkers: clearMarkers,
      setRadius: setRadius,
      getBounds: getBounds,
      setCenter: setCenter,
      getCircleProps: getCircleProps
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
          circle,
          point;

      pos = new google.maps.LatLng(lat, lng);

      point = new google.maps.Marker({
        position: pos,
        map: getMap()
      });

      service.markers[0] = service.point = point;

      circle = new google.maps.Circle({
        center: pos,
        map: getMap(),
        strokeColor: '#000',
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: '#F0F4F9',
        fillOpacity: 0.5,
        radius: kmRadius * 1000
      });

      service.markers[1] = service.circle = circle;

    }

    function getCircleProps() {
      var radius = service.circle.getRadius();
      var lat = service.circle.getCenter().lat();
      var lng = service.circle.getCenter().lng();

      return {
        radius: radius,
        lat: lat,
        lng: lng
      }
    }

    function initAutoComplete() {
      var options = {
        types: ['geocode'],
        componentRestrictions: {country: "us"}
      };

      setAutocomplete(
        new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'), options));
    }

    function initMap() {
      var mapOptions = {
        center: new google.maps.LatLng(37.773972, -122.431297),
        zoom: 9,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true
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
      if(!service.markers.length) {
        return
      }
      service.markers.forEach(function(marker) {
        marker.setMap(null)
      })
    }

    function setRadius(radius) {
      service.markers[1].set('radius', radius * 1000)
    }

    function getBounds() {
      return service.circle.getBounds();
    }

    function setCenter() {
      getMap().setCenter(service.circle.getCenter());
    }


  }
})()