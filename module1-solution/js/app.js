(function () {
'use strict';

angular.module('Mod1App', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.message = "";

  $scope.items = "";

  $scope.checkItems = function () {
    var LunchItems = $scope.items;
    var LunchItemsArray = LunchItems.split(',');
    var NumberOfItems = LunchItemsArray.length;
    var message = "";
    $scope.messageColor ="";
    $scope.InpBorder ="";

    for (var i=0; i <  LunchItemsArray.length; i++ ) {
      if (LunchItemsArray[i] == "") {
        NumberOfItems--;
      }
    }

    // console.log(NumberOfItems);

    if (NumberOfItems <= 0) {
      message = "Please enter data first!";
      $scope.messageColor = "red";
          $scope.InpBorder = "redborder";
    }
    else  {
            $scope.messageColor = "green";
                $scope.InpBorder ="greenborder";
            if (NumberOfItems <= 3) {
              message = "Enjoy!";
            }
            else {
              message = "Too much!"
            }
          }
    $scope.message = message;
  };
}

})();
