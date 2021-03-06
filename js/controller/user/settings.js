/**
 * Created by slashhuang on 15/8/23.
 */
define(["/js/lib/jquery.js", "/js/lib/ajaxfileupload.js"], function ($, ajaxFileUpload) {
    //定义商品分类controller
    function userSettingsCtrl($scope, $routeParams, $location, $http) {
        var logoutURL = prefuri + "/user/logout";
        var time = 4;

        //初始化show状态
        $scope.logoutStatus = false;

        $scope.infoHint = "";

        //登出函数
        $scope.logout = function () {
            time = 3;
            $http({
                "method": "get",
                "url": logoutURL
            }).success(function (data) {
                $scope.infoHint = "登出成功" + time + "秒后转向首页";
                outLogin("登出成功");
            }).error(function () {
                $scope.infoHint = "登出失败" + time + "秒后转向首页";
                outLogin("登出失败");
            });
        };

        function outLogin(txt) {
            $scope.infoHint = txt + time + "秒后转向首页";
            $scope.logoutStatus = true;
            var interval = setInterval(function () {
                $scope.$apply(function () {
                    time--;
                    $scope.infoHint = txt + time + "秒后转向首页";
                    if (time == 0) {
                        clearInterval(interval);
                        location.hash = "#/main";
                    }
                });
            }, 1000);
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

    userSettingsCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return userSettingsCtrl;
});