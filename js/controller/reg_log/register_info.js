/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function registerInfoCtrl($scope,$routeParams,$location,$http){
        var completeInfoURL = prefuri+"/user/complete";//完善信息url
        //页面载入请求
        $scope.completeData = {
            "idNo": "string",
            "province": 0,
            "city": 0,
            "county": 0,
            "school": 0,
            "campus": 0,
            "level": "string",
            "userName": "string"
        };
        //$http({
        //    "method":"post",
        //    "url":completeInfoURL,
        //}).success(function(data){
        //    console.log("getting complete data succeed");
        //}).error(function(){
        //    alert("请求失败")
        //});

        //点击触发请求
        $scope.AjaxHttp = function(key){
            $http({
                "method":"post",
                "url":completeInfoURL,
                "data":$scope.completeData,
            }).success(function(response, status, headers, config){
                console.log("点击获取数据请求成功")
            }).error(function(){

            });
        };

    };
    registerInfoCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return registerInfoCtrl;
});