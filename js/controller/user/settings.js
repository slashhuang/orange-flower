/**
 * Created by slashhuang on 15/8/23.
 */
define(["/js/lib/jquery.js", "/js/lib/ajaxfileupload.js"], function ($, ajaxFileUpload) {
    //定义商品分类controller
    function userSettingsCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {
        var logoutURL = $rootScope.prefuri + "/user/logout";
        var time = 4;

        //初始化show状态
        $scope.logoutStatus = false;
        $scope.infoHint = "";
        $scope.jumpCode=function(){
            var verifyCodeUrl = $scope.prefuri+"/user/judgeYqm";
            $http({
                "method": "post",
                "url": verifyCodeUrl
            }).success(function (data) {
                if(!data){
                    $scope.infoHint="您已经使用过邀请码";
                    $timeout(function(){ $scope.infoHint = "";},1000)
                }
                else{
                    $location.path("/invitedCode");
                }

            }).error($rootScope.httpError);

        };
        //登出函数
        $scope.logout = function () {
            time = 1;
            $http({
                "method": "get",
                "url": logoutURL
            }).success(function (data) {
                $scope.logoutStatus = true;
                window.localStorage.centerData="";
                window.localStorage.isLogin = false;
                $location.path("/main");
            }).error(function (err) {
                $scope.logoutStatus = false;
                $rootScope.httpError(err);
            });
        };

        //页面出现效果
        $scope.changeLogoutStatus = function (status) {
            if (status) {
                $scope.logoutStatus = false;
            }
            else {
                $scope.logoutStatus = true;
            }
        };
    }

    userSettingsCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return userSettingsCtrl;
});