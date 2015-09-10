define([], function () {
    //定义确定购买orderConfirm
    function orderInfoCtrl($scope, $routeParams, $location, $http,$rootScope) {
        //初始化变量完成

        var uId = $location.search()["uId"];
        //  从url里面获取orderId

        //$scope.url = "/order/detail?orderId=" + orderId;
        $scope.url = "/order/list?uId=" + uId;
        $scope.countTime = 3;

        var interval = setInterval(function(){
            $scope.$apply(function(){
                $scope.countTime --;
                if($scope.countTime == 0){
                    clearInterval(interval);
                    location.href = $scope.url;
                    //$location.path($scope.url);
                }
            });
        },1000);
        //  脏检查
    };
    orderInfoCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return orderInfoCtrl;
});