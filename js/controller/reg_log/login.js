/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http){
        var loginURL = prefuri+"/user/login/"
        //统一Ajax请求
        $scope.loginCollection={
            loginName:"",
            password:""
        };
        //页面载入请求
        $scope.AJAXhttp = function(){
            var loginDATA = $scope.loginCollection;
            $http({
                "method":"post",
                "url":loginURL+loginDATA.loginName+'/'+loginDATA.password
            }).success(function(data){
                console.log("login data succeed");
            }).error(function(){
                alert("请求失败")
            });
        }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return loginCtrl;
});