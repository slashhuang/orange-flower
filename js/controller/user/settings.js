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