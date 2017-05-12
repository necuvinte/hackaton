app
    .controller('main', function ($scope, $http, $rootScope, $location) {

        $scope.logout = function() {
            $http.post("/logout")
                .then(function() {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }

    });