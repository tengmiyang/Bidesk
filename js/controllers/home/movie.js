app.controller('movieController',function($scope,jsonpSer){
    $scope.status = 1;
    $scope.changeStatus = function(status){
        $scope.status = status;
    };

    jsonpSer.jsonP(
        'http://api.douban.com/v2/movie/in_theaters',
        {start:0,count:12},
        function(data){
            $scope.data = data;
            $scope.$apply();
        })
});