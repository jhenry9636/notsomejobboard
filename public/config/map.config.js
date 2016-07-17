angular.module('nsj.wizard', ['uiGmapgoogle-maps']).config(
  ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
    GoogleMapApiProviders.configure({
      china: true
    });
  }]
);