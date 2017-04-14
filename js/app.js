var app = angular.module('myApp',['ui.router']);

app.controller('myController',function($scope){
    $scope.listStatus = 1;

    $scope.changeList = function(status){
        $scope.listStatus = status;
    }
});