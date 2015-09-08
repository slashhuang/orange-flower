/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function centerCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {
        var userCenterUrl = $rootScope.prefuri + "/user/info";
        $scope.centerData = {};

        $rootScope.isLogin = true;

        /**
         * 处理HTTP请求
         */
        var XHRrequest = $http({
            "method": "post",
            "url": userCenterUrl
        });
        XHRrequest.success(function (data) {
            $scope.debugLog(data);
            $scope.centerData = data;
            if(data.id){
                $rootScope.isLogin = true;
            }
        }); //@TODO 需要写精简一点
        XHRrequest.error($scope.httpError);

        /**
         * 判断是否完善信息
         * @param info
         */
        $scope.rendInfo = function(info){
            if(!info){
                return "请先完善信息";
            }
            return info;
        };

        /**
         * 处理跳转信用额度中心
         * @param bool
         */
        $scope.centerJump = function(bool){
            if(!bool){
                //location.href="#/user/credit"
                location.href="/user/credit"
            }
        }

    }
    centerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return centerCtrl;
});