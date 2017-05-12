app
    .controller('login', function ($scope, $http, $location, $rootScope) {

        $scope.login = function(user) {
            $http.post('/login', user)
                .then(function (response) {
                    $rootScope.currentUser = response;
                    console.log('redirecting');
                    $location.url("/home");
                }, function(){
                    alert("Logarea ta a esuat");
                });
        }
    });