/**
 * Created by slashhuang on 15/8/23.
 */
define(["/js/lib/jquery.js","/js/lib/ajaxfileupload.js"],function($,ajaxFileUpload){
    //定义商品分类controller
    function userSettingsCtrl($scope,$routeParams,$location,$http){
        var logoutURL = prefuri + "/user/logout";


        //初始化show状态
        $scope.logoutStatus = false;

        //登出函数
        $scope.logout = function () {
            $http({
                "method":"get",
                "url":logoutURL
            }).success(function(data){
                alert("登出成功,即将转向首页");
            }).error(function(){
                alert("登出失败")
            });
        };

        //页面出现效果
        $scope.changeLogoutStatus = function(status){
            if(status){
                $scope.logoutStatus =false;
            }
            else{
                $scope.logoutStatus=true;
            }
        };
    }
    userSettingsCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return userSettingsCtrl;
});