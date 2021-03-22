angular.module("cart", [])
 .factory("cart", function() {
     var cartTab = [];

     return {
         addItem: function (id, name, price) {
             var addedProduct = false;
             for (var i = 0; i < cartTab.length; i++) {
                 if (cartTab[i].id == id && cartTab[i].price == price) {
                     cartTab[i].count++;
                     addedProduct = true;
                     break;
                 }
             }
             if (!addedProduct) {
                 cartTab.push({
                     count: 1, id: id, price: price, name: name
                 });
             }
         },

         removeItem: function (id) {
             for (var i = 0; i < cartTab.length; i++) {
                 if (cartTab[i].id == id) {
                     cartTab.splice(i, 1);
                     break;
                 }
             }
         },

         getTab: function() {
             return cartTab;
         }
     }
 })
 .directive("cartNavbar", function (cart) {
     return {
         restrict: "E",
         templateUrl: "components/cart/cartNavbar.html",
         controller: function ($scope) {
             var cartTab = cart.getTab();

             $scope.pizzaCount = function () {
                 var sum = 0;
                 for (var i = 0; i < cartTab.length; i++) {
                     sum += cartTab[i].count
                 }
                 return sum;
             }
         }
     };
 });