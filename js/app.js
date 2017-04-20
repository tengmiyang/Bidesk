var app = angular.module('myApp',['ui.router']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix("");
}]);

app.controller('myController',function($scope,$state){
    $scope.listStatus = 1;

    $scope.noneC = function(){
        console.log(123);
        $state.go('search',{'content':$scope.content});
        //$state.go('country.detail', { 'countryId': id });
        $scope.content ='';
    };

    $scope.changeList = function(status){
        $scope.listStatus = status;
    };

});