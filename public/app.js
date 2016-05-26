angular.module('myApp', [])

.controller('FirstCtrl', FirstCtrl)

.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

function FirstCtrl($scope, $http){

    $http({
  method: 'GET',
  url: '/api/developer'
}).then(function successCallback(response) {
  console.log(response)
  $scope.devs = response.data.collection

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  })

} 