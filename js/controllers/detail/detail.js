app.controller('detailController',function($scope,$stateParams,jsonpSer){
    $scope.showF = true;
    jsonpSer.jsonP(
        'http://api.douban.com/v2/movie/subject/'+$stateParams.id,
        {},
        function(data){
            $scope.data = data;
            console.log(data);
            $scope.showF = false;
            $scope.$apply();
        })
});