angular.module("pizzeria")
    .controller("listPizzaCtrl", function ($scope, cart) {
        $scope.addMedium = function (pizza) {
            cart.addItem(pizza.id, pizza.name, pizza.priceM);
        }

        $scope.addLarge = function (pizza) {
            cart.addItem(pizza.id, pizza.name, pizza.priceL);
        }
    });