app.controller('movieNextController',function($scope,jsonpSer){
    jsonpSer.jsonP(
        'http://api.douban.com/v2/movie/in_theaters',
        {start:0,count:12},
        function(data){
            $scope.data = data;
            $scope.$apply();
        })
});