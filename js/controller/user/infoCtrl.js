/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    function infoCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){

        /**
         * 用户数据在主程序路口存入$rootScope.centerData,
         * 在进页面时候就在登录和进用户中心的时候，点击按钮存入
         */

        if(window.localStorage.centerData){
            $rootScope.centerData = JSON.parse(window.localStorage.centerData);
            console.log($rootScope.centerData )
        }
        else{
            location.href="#/login";
            //location.href="/login"
        }

    }
    infoCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];
    return infoCtrl;
});