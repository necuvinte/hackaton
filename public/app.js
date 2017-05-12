var app = angular.module('admin', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.

    when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'main',
         resolve: {
             logincheck: checkLoggedin
         }
    }).
        when('/', {
            templateUrl: 'templates/login.html',
            controller: 'login'
    }).
        otherwise({
        redirectTo: '/'
    })



}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').then(function(user) {
        $rootScope.errorMessage = null;
        //User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else { //User is not Authenticated
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/');
        }
    });
    return deferred.promise;
};