(function () {
  'use strict';
  angular.module('myFirstApp',[])
  .controller('MyFirstController', function ($scope) {
    $scope.name ="Serhii";
    $scope.val1 = "One";
    $scope.cost = .5;
    console.log($scope);
    $scope.sayHello = function () {
      return "Hello";
    }
  });
})();
