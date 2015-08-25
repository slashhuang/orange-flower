/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function registerCtrl($scope,$routeParams,$location,$http){

        var sendSmsUrl = prefuri+"/user/getCode";//发送短信url
        var registerUrl = prefuri+"/user/register";//提交注册信息
        $scope.telephone="";
        $scope.password="";
        $scope.repeatPassword="";
        $scope.code="";
        $scope.checkbox = function(){
            $scope.verified=!$scope.verified;
        };
        $scope.sendsms=function(tel){
            $http({
                "method":"post",
                "url":sendSmsUrl+"/"+tel
            }).success(function(response, status, headers, config){
            }).error(function(){
            });
        };
        $scope.register=function(telephone,password,code){
            $http({
                "method":"post",
                "url":registerUrl,
                "data":{
                    "tetephone":telephone,
                    "password":password,
                    "code":code
                }
            }).success(function(response, status, headers, config){
                setTimeout(function(){
                },1000)
            }).error(function(){
                setTimeout(function(){
                   window.location.href="#/login"
                },1000)
            });
        };
    };
    registerCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return registerCtrl;
});