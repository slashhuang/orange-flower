/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    //定义商品分类controller
    function userCreditCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){



        if(window.localStorage.centerData){
            $rootScope.centerData = JSON.parse(window.localStorage.centerData);
            console.log($rootScope.centerData )
        }
        else{
            //location.href="#/login";
            $location.path("/login")
        }

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
            var userCredit = $rootScope.verifyActive($scope.centerData.userAuthOffline.authStatus.value);
            if(userCredit){
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
            return $scope.linkFlag ? "/user/info" : "/registerInfo:;";
        };
    }
    userCreditCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];
    return userCreditCtrl;
});