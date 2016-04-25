<!doctype html>
<html ng-app="myApp">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      angular.module('myApp', []).controller('myCtrl', function($scope) {
        $scope.name = "Jarrad"
      })
    </script>
    <div ng-controller="myCtrl">
      Testing: {{name}}
    </div>
  </body>
</html>