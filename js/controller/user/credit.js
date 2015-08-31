/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    //定义商品分类controller
    function userCreditCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){
        var userCreditUrl= $rootScope.prefuri + "/user/info";
        $scope.creditInfo = {};
        //重置头像@TODO
        $http({
            method:"post",
            url:userCreditUrl
        }).success(function(){
            $scope.creditInfo = arguments[0];
            $scope.debugLog(arguments)
        })
    }
    userCreditCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];
    return userCreditCtrl;
});