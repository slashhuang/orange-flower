/**
 * Created by slashhuang on 15/8/21.
 */
define(['loadScript','angular','config/routeConfig','lib/angular-route',
        'controller/main','controller/sales/sales',
            'controller/user/user', 'controller/order/order',
            'controller/reg_log/reglog', 'controller/main',
            'controller/sales/sales','controller/user/user',
            'controller/reg_log/reglog', 'controller/order/order','controller/bill/bill'],
        function(scriptsLoader,angular,routeConfig){

           //window.prefuri = "http://api.orangezc.com";
            window.isLogin = false;
    var app = angular.module('app',
        ["ngRoute","mainModule","salesModule","ngLoadScript","userModule","orderModule","reglogModule","orderModule","billModule"]);


         //定义全局变量
        app.run(function($rootScope) {
                    $rootScope.prefuri =  "http://api.orangezc.com";
                }) ;





        app.controller("BottomController",['$http','$location','$scope','$rootScope',function($http,$location,$scope,$rootScope){
            $scope.addActive = function(cur){
                var hash = location.hash;
                if(hash.indexOf(cur) > 0){
                    return "active";
                }
                return "";
            };
            //console.log($scope)

        }]);
            //定义全局变量
    //配置路由
    app.config(routeConfig);
    angular.bootstrap(document, ['app']);
});