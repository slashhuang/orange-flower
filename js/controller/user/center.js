/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function centerCtrl($scope,$routeParams,$location,$http){
        var userCenterUrl = prefuri + "/user/load"
        $scope.verifyActive =function(){

        };
        $scope.centerData = {};
        //页面载入请求
        $http({
            "method":"get",
            "url":userCenterUrl
        }).success(function(data){
            $scope.centerData =data;
            console.log(data)
        }).error(function(){
            alert("请求失败")
        });


        }
    centerCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return centerCtrl;
});