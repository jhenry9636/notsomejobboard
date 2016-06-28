(function() {
  'use strict'

  angular.module('nsj.wizard')
    .factory('mapsService', mapsService)

  function mapsService() {

    var service = {
      map: null,
      getMap: getMap,
      setMap: setMap,
      init: function() {
        var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 4,
          disableDefaultUI: true
        }
        this.setMap(new google.maps.Map(document.getElementById('map'), mapOptions));
      },
      setMap: setMap
    }

    return service


    function setMap(map) {
      service.map = map;
      service.map.panBy(0, 30);
    }

    function getMap() {
      return service.map
    }
  }
})()