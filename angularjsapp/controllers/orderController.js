angular.module("pizzeria")
 .controller("totalOrderCtrl", function ($scope, cart) {
     $scope.cartTab = cart.getTab();

     $scope.sum = function () {
         var sum = 0;
         for (var i = 0; i < $scope.cartTab.length; i++) {
             sum += ($scope.cartTab[i].price * $scope.cartTab[i].count);
         }
         return sum;
     }

     $scope.remove = function (id) {
         cart.removeItem(id);
     }
 });