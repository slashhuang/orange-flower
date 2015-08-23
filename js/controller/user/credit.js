/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    //定义商品分类controller
    function userCreditCtrl($scope,$routeParams,$location,$http,$timeout){
        var userCreditUrl= prefuri + "";
        //重置头像@TODO
        $scope.changeHead = function(){

        }
    }
    userCreditCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout'];
    return userCreditCtrl;
});