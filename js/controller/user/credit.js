/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    //定义商品分类controller
    function userCreditCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){
        var userCreditUrl= $rootScope.prefuri + "/user/info";
        $scope.creditInfo = {};
        //重置头像@TODO
        $http({
            method:"post",
            url:userCreditUrl
        }).success(function(){
            $scope.creditInfo = arguments[0];
            $scope.debugLog(arguments)
        }).error($rootScope.httpError);

        /**
         * 可用额度/信誉额度
         * @param number
         */
        $scope.rendMoney = function(number){
            if(!number){
                return "0.00";
            }else{
                return $scope.transferPrice(number);
            }
        };

        /**
         * 根据用户是否认证显示按钮文字
         * @returns {string}
         */
        $scope.btnText = function(){
            var userCredit = $scope.userCredit;
            if(userCredit && userCredit.totalCredit > 0){
                $scope.linkFlag = true;
                return "查看信息";
            }
            $scope.linkFlag = false;
            return "立即完善";
        };

        /**
         * 根据不同的认证状态值返回不同的href
         * @returns {string}
         */
        $scope.rendLink = function(){
            return $scope.linkFlag ? "/registerInfo" : "javascript:;";
        };
    }
    userCreditCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];
    return userCreditCtrl;
});