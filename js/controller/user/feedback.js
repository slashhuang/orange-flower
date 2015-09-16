/**
 * Created by slashhuang on 15/9/15.
 */
define([],function(){
    function feedbackCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){

        /**
         * 进入页面判断localstorge
         */
        if(window.localStorage.centerData){
            $rootScope.centerData = JSON.parse(window.localStorage.centerData);
            console.log($rootScope.centerData )
        }
        else{
            $location.path("/login")
        };
        $scope.showFunc = false;
        $scope.changeHeadView =function(){
            $scope.showFunc=!$scope.showFunc;
        };
        $scope.feedbackOrchen=false;
        /**
         * 用户数据在主程序路口存入$rootScope.centerData,
         * 在进页面时候就在登录和进用户中心的时候，点击按钮存入
         */
        $scope.feedbackSubmit = function(feedbackText){
            if(typeof feedbackText=='undefined'){
                $rootScope.ErrorMessage="请输入您的宝贵意见～";
                $timeout(function(){
                    $rootScope.ErrorMessage=""
                },1200);
            }
           else{
                //@ TODO 等待后端接口
                $http({
                    'method':"post",
                    'url':$scope.prefuri
                }).success(
                    function(){
                       $scope.feedbackOrchen=true;
                       $timeout(function(){
                           $location.path("/user/center")
                       },800)
                    }
                ).error($scope.httpError)
            }

        }

    }
    feedbackCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];
    return feedbackCtrl;
});