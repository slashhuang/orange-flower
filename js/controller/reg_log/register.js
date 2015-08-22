/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function registerCtrl($scope,$routeParams,$location,$http){
        var sendSms = prefuri+"/user/getCode";//发送短信url
        //页面载入请求
        //$http({
        //    "method":"get",
        //    "url":sendSms,
        //}).success(function(data){
        //    console.log("getting register data succeed");
        //}).error(function(){
        //    alert("请求失败")
        //});

        //点击触发请求
        $scope.AjaxHttp = function(key){
            $http({
                "method":"post",
                "url":sendSms,
                "data":{
                    "sortType": "DEFAULT",
                    "keyword": "string",
                    "catId": 1
                },
            }).success(function(response, status, headers, config){
                console.log("点击获取数据请求成功")
            }).error(function(){

            });
        };

    };
    registerCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return registerCtrl;
});