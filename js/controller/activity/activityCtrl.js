/**
 *   build by rwson 2015-09-14
 *   活动列表控制器
 */
define([], function () {
    function activityCtrl($scope, $routeParams, $location, $http,$rootScope) {

        $scope.uniqueClass = "activity-main";
        //  单独的class

        var now = Date.now();
        //  获取当前时间

        $http({
            "url": $scope.prefuri + "/lottery/list",
            "method":"POST"
        }).success(function(res){
            $scope.listItem = res["content"];
        }).error($scope.httpError);
        //  刚进页面,就请求数据

        /**
         * 判断是否过期
         * @param time
         * @returns {boolean}
         */
        $scope.isOutOfDate = function(time){
            return time < now;
        };
    }
    activityCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return activityCtrl;
});