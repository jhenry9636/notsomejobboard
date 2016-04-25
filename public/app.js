angular.module('myApp', [])

.controller('FirstCtrl', FirstCtrl)

.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

function FirstCtrl($scope, $http){

    $http({
  method: 'GET',
  url: 'http://localhost:8080/api/candidate'
}).then(function successCallback(response) {
  console.log(response)
  $scope.devs = response.data

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  })

} 