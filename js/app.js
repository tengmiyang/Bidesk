var app = angular.module('myApp',['ui.router']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix("");
}]);

app.controller('myController',function($scope){
    $scope.listStatus = 1;

    $scope.changeList = function(status){
        $scope.listStatus = status;
    }
});