app.controller('movieNowController',function($scope,jsonpSer){
    $scope.showF = true;
    $scope.pageNow = 0;
    function init(){
        jsonpSer.jsonP(
            'http://api.douban.com/v2/movie/in_theaters',
            {start:$scope.pageNow,count:12},
            function(data){
                $scope.data = data;
                $scope.showF = false;
                $scope.$apply();
            }
        );
    }
    init();
    $scope.changePage = function(status){
        if(status){
            $scope.pageNow += 12;
            init();
        }else{
            $scope.pageNow -= 12;
            init();
        }
    }

});