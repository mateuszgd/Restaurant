angular.module("adminPizzeria")
    .constant("url", "http://localhost:2403/users/login")
    .constant("urlOrder", "http://localhost:2403/orders/")
    .controller("adminCtrl", function ($scope, $http, $location, url) {
        $scope.auth = function (user, pw) {
            $http.post(url, {
                username: user,
                password: pw,
            }, {
                withCredentials: true
            }).success(function (data) {
                $location.path("/mda");
            }).error(function (error) {
                $scope.errorAuth = error;
            });
        }
    })
    .controller("panelCtrl", function ($scope) {
        $scope.tab = ["Menu", "Zamówienia"];
        $scope.selected = $scope.tab[0];

        $scope.tabSet = function (i) {
            $scope.selected = $scope.tab[i];
        };

        $scope.tabGet = function () {
            return $scope.selected == "Menu" ? "views/adminMenu.html" : "views/adminOrder.html";
        };
    })
    .controller("getOrderCtrl", function ($scope, $http, $resource, urlOrder) {
        $http.get(urlOrder, { withCredentials: true })
            .success(function (data) {
                $scope.orderTab = data;
            })
            .error(function (error) {
                $scope.errorOrder = error;
            });

        $scope.path = $resource(urlOrder + ":id", { id: "@id" });
        $scope.orderTab = function () {
            $scope.orders = $scope.path.query();
        }

        $scope.orderShow;

        $scope.showOrder = function (order) {
            $scope.orderShow = order;
        }

        $scope.sum = function (product) {
            var sum = 0;
            for (var i = 0; i < product.products.length; i++) {
                sum += product.products[i].count * product.products[i].price;
            }
            return sum;
        }

        $scope.delete = function (order) {
            order.$delete().then(function () {
                $scope.orders.splice($scope.orders.indexOf(order), 1);
            });
        }

        $scope.orderTab();
    });