app.controller('searchController',function($scope,jsonpSer,$stateParams){
    $scope.pageNow = 0;
    $scope.page = 1;
    function init(){
        $scope.showF = true;
        jsonpSer.jsonP(
            'http://api.douban.com/v2/movie/search',
            {q:$stateParams.content},
            function(data){
                $scope.data = data;
                $scope.total = data.total;
                $scope.showF = false;
                $scope.allPage= Math.ceil($scope.total/12);
                $scope.$apply();
            }
        );
    }
    init();
    $scope.changePage = function(status){
        if(status){
            $scope.pageNow+=12;
            $scope.page +=1;
        }else{
            $scope.pageNow-=12;
            $scope.page -=1;
        }
        if($scope.pageNow<0){
            $scope.pageNow = 0;
            return;
        }
        if($scope.page > Math.ceil($scope.total/12) ){
            return;
        }
        init();
    }
});