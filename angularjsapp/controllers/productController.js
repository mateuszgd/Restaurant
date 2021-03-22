angular.module("adminPizzeria")
    .constant("urlToProduct", "http://localhost:2403/products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("adminProductCtrl", function ($scope, $resource, urlToProduct) {
        $scope.path = $resource(urlToProduct + ":id", { id: "@id" });
        $scope.productTab = function () {
            $scope.products = $scope.path.query();
        }

        $scope.create = function (p) {
            new $scope.path(p).$save().then(function (pNew) {
                $scope.products.push(pNew);
                $scope.productEdit = null;
            });
        }

        $scope.edit = function (p) {
            $scope.productEdit = p;
        }

        $scope.update = function (p) {
            p.$save();
            $scope.productEdit = null;
        }

        $scope.cancel = function () {
            $scope.productEdit = null;
        }

        $scope.delete = function (p) {
            p.$delete().then(function () {
                $scope.products.splice($scope.products.indexOf(p), 1);
            });
        }

        $scope.addProduct = function () {
            $scope.value = true;
        }

        $scope.productTab();
    });