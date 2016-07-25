(function () {
  'use strict'

  angular.module('search')
    .directive('nsjSearchGoogleMap', nsjSearchGoogleMap)

  function nsjSearchGoogleMap() {
    return {
      controller: ctrl,
      templateUrl: '/search/nsjSearchGoogleMap.html'
    }
  }

  ctrl.$inject = []

  function ctrl() {
    var mapOptions = {
      center: new google.maps.LatLng(37.773972, -122.431297),
      zoom: 9,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true
    }

    new google.maps.Map(document.getElementById('map'), mapOptions)
  }


})()