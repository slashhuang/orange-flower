/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function registerInfoCtrl($scope,$routeParams,$location,$http,$timeout){
        var completeInfoURL = prefuri+"/user/complete";//完善信息url
        var gettingCityList = prefuri+"";//获取城市和大学列表

        //额外信息组件
        $scope.hintStatus = false;
        $scope.infoHint = "";
        var hintFUNC = function(){//完善信息成功后输出提示并且跳转首页
            $scope.hintStatus =true;
            $scope.infoHint = "您已经获取6000元额度，可以立即购物哦～";
            $timeout(function(){
                $scope.hintStatus = false;
                window.location.href="#/main"
            },2500);
        };
        //一下数据是根据http请求获取的
        $scope.infoData={
            cityList:[],
            school:[],
            campus:[],
        };
        //页面载入请求
        $scope.completeData = {
            "idNo": "",
            "province": "",
            "city": "",
            "county": "",
            "school": "",
            "campus": "",
            "level": "",
            "userName": ""
        };
        //点击触发请求列表请求
        $scope.setData=function(province){
            $http({
                "method":"post",
                "url":gettingCityList,
                "data":$scope.completeData,
            }).success(function(response, status, headers, config){
                alert("点击获取列表数据请求成功")
            }).error(function(){
                alert("点击获取列表数据失败")
            });
            //仅测试使用
            $scope.infoData.cityList=["nanjing","beijing","chongqing"];
        };
        //点击触发下一步
        $scope.nextStep = function(){
            $http({
                "method":"post",
                "url":completeInfoURL,
                "data":$scope.completeData,
            }).success(function(response, status, headers, config){
                hintFUNC();
            }).error(function(){
                console.log($scope.completeData);
                alert("未能成功http");
                hintFUNC();
            });
        };


    };
    registerInfoCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout'];

    return registerInfoCtrl;
});