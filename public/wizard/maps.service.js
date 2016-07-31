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
      getCircleProps: getCircleProps,
      generateGeoJSONCircle: generateGeoJSONCircle,
      getCurrentLocation: getCurrentLocation
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
        map: getMap(),
        animation: google.maps.Animation.DROP
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

      var data = {
        "type": "Feature",
        "id": 9876,
        "geometry": {
        "type": "Point",
          "coordinates": [
            37.7749,
            122.4194
        ]
      },
        "properties": {
        "condition": "Satisfactory",
          "has_garage": false,
          "number_of_bedrooms": 3
        }
      };

      getMap().data.addGeoJson(data)

    }

    function getCurrentLocation() {
      var deferred = $q.defer();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
          deferred.resolve(location)
        });
      } else {
        deferred.reject('Geo Location is not supported')
      }
      
      return deferred.promise;
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

    function initMap(lat, lng) {
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

    function generateGeoJSONCircle(coordinates, radius, numSides) {
      debugger
      var points = [];
      var earthRadius = 6371;
      var halfsides = numSides / 2;

      //angular distance covered on earth's surface
      var d = parseFloat(radius / 1000.) / earthRadius;

      var lat = (coordinates[1] * Math.PI) / 180;
      var lon = (coordinates[0] * Math.PI) / 180;

      for(var i = 0; i < numSides; i++) {
        var gpos = {};
        var bearing = i * Math.PI / halfsides; //rad
        gpos.latitude = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(bearing));
        gpos.longitude = ((lon + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(gpos.latitude))) * 180) / Math.PI;
        gpos.latitude = (gpos.latitude * 180) / Math.PI;
        points.push([gpos.longitude, gpos.latitude]);
      };

      points.push(points[0]);
      return {
        type: 'Polygon',
        coordinates: [ points ]
      };
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
      service.markers[1].set('radius', radius * 1000) //100 / 3963.2
    }

    function getBounds() {
      return service.circle.getBounds();
    }

    function setCenter() {
      getMap().setCenter(service.circle.getCenter());
    }


  }
})()