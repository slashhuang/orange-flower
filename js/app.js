/**
 * Created by slashhuang on 15/8/21.
 */
define(['loadScript','angular','config/routeConfig','lib/angular-route',
        'controller/main','controller/sales/sales','controller/user/user', 'controller/order/order','controller/reg_log/reglog'],
        function(scriptsLoader,angular,routeConfig){
            window.prefuri = "http://juhua-server.orange.com";
    var app = angular.module('app',
        ["ngRoute","mainModule","salesModule","ngLoadScript","userModule","orderModule","reglogModule"]);
    //配置路由
    app.config(routeConfig);
    angular.bootstrap(document, ['app']);
});