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
            window.prefuri = "http://juhua-server.orange.com";
            window.isLogin = false;
    var app = angular.module('app',
        ["ngRoute","mainModule","salesModule","ngLoadScript","userModule","orderModule","reglogModule","orderModule","billModule"]);
        app.controller("BottomController",['$http','$location','$scope',function($http,$location,$scope){
        }]);
    //配置路由
    app.config(routeConfig);
    angular.bootstrap(document, ['app']);
});