<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>Hello World, AngularJS - ViralPatel.net</title>
    <script type="text/javascript"
        src="/vendor/angular/angular.min.js"></script>
        <script type="text/javascript" src="/app.js"></script>
 
</head>
<body>
  <h1>NotSomeJobBoard.Com</h1>
  <div ng-controller="FirstCtrl">
    <ul>
        <li ng-repeat="dev in devs">
          <b>{[{dev.firstName}]}</b>
        </li>
    </ul>
  </div>     

</body>
</html>