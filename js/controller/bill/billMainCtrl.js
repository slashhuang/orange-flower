define([], function () {
    //还款历史
    function billMainCtrl($scope, $routeParams, $location, $http,$rootScope) {
        //初始化变量完成

        var date = new Date(),
            month = date.getMonth();

        $scope.year = date.getFullYear();
        $scope.month = date.getMonth() + 1;
        //  取得当前年月

        $scope.handle = false;
        //  判断是否隐藏显示

        $http({
            "method":"post",
            "url": $rootScope.prefuri + "/repay/bill/{year}/{month}?month=" + $scope.month + "&year=" + $scope.year
        }).success(function(res){
            $scope.data = res;
        }).error(function(){
        });

        /**
         * 渲染新的信息DOM
         * @param month
         */
        $scope.rendNewInfo = function(month){
            $scope.month = month;
            $http({
                "method":"post",
                "url": $rootScope.prefuri + "/repay/bill/{year}/{month}?month=" + $scope.month + "&year=" + $scope.year
            }).success(function(res){
                $scope.data = res;
                $scope.handle = false;
            }).error(function(){
            });
        };

        /**
         * 下年按钮
         */
        $scope.nextMonth = function(){
            //$scope.month ++;
            //if($scope.month > 12){
            //    $scope.month = 1;
            //    $scope.year ++;
            //}
            $scope.year ++;
        };

        $scope.lastMonth = function(){
            //$scope.month --;
            //if($scope.month < 1){
            //    $scope.month = 12;
            //    $scope.year --;
            //}
            $scope.year --;
        };

        /**
         * 操作隐藏和显示
         */
        $scope.toggleShow = function(){
            $scope.handle = !$scope.handle;
        };

        /**
         * 当前月的选中效果
         * @param month
         * @returns {string}
         */
        $scope.active = function(month){
            if(month == $scope.month){
                return "active";
            }
            return "";
        };

    };
    billMainCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return billMainCtrl;
});