angular.module("pizzeria")
    .constant("url", "http://localhost:2403/products")
    .constant("urlOrder", "http://localhost:2403/orders")
    .controller("pizzeriaCtrl", function ($scope, $http, $location, url, urlOrder, cart) {
        $scope.data = {};

        $http.get(url)
            .success(function (data) {
                $scope.data.products = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            })
         
        $scope.send = function (totalOrder) {
            var order = angular.copy(totalOrder);
            order.products = cart.getTab();
            $http.post(urlOrder, order)
            .success (function (data) {
                $scope.data.idOrder = data.id;
                cart.getTab().length = 0;
            })
            .error(function (error) {
                $scope.data.errorOrder = error;
            }).finally(function () {
                $location.path("/done");
            })
        }
    });