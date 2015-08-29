/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    //定义商品分类controller
    function setAccountCtrl($scope,$routeParams,$location,$http,$rootScope){
        var setAccountUrl= prefuri + "/user/complete";
        //登出函数
        $scope.logout = function () {
            $http({
                "method":"post",
                "url":setAccountUrl
            }).success(function(data){
            }).error($rootScope.httpError);
        };
        //重置头像@TODO
        $scope.changeHead = function(){

        }
    }
    setAccountCtrl.$inject=['$scope','$routeParams','$location','$http','$rootScope'];
    return setAccountCtrl;
});