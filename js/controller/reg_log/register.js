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
            alert("选中了checkbox状态为"+$scope.verified)
        };
        $scope.sendsms=function(tel){
            $http({
                "method":"post",
                "url":sendSmsUrl+"/"+tel,
            }).success(function(response, status, headers, config){
                alert(tel+"点击获取数据请求成功")
            }).error(function(){
                alert(tel+"请求失败")
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
                console.log(telephone+password+code)
                alert("注册成功,1秒后转向登录页面");
                setTimeout(function(){
                    console.log($location)
                },1000)
            }).error(function(){
                console.log(telephone+password+code)
                alert("注册失败,请检查您的输入是否有误,1秒后转向登录页面");
                setTimeout(function(){
                   window.location.href="#/login"
                },1000)
            });
        };
    };
    registerCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return registerCtrl;
});