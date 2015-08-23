/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http){
        var loginURL = prefuri+"/user/login/"
        //页面载入请求
        $scope.login =function(loginName,password){
            $http({
                "method":"post",
                "url":loginURL+loginName+'/'+password
            }).success(function(data){
                console.log("login data succeed");
            }).error(function(){
                alert("登录请求失败，1秒后转向首页");
                window.location.href="#/mainn"
            });
        }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return loginCtrl;
});