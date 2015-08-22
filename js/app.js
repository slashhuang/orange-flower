/**
 * Created by slashhuang on 15/8/21.
 */
define(['loadScript','angular','config/routeConfig','lib/angular-route',
        'controller/main','controller/sales/sales','controller/user/user', 'controller/order/order'],
        function(scriptsLoader,angular,routeConfig){
            window.prefuri = "http://juhua-server.orange.com";
    var app = angular.module('app',["ngRoute","mainModule","salesModule","ngLoadScript","userModule","orderModule"]);
    //配置路由
    //console.log(app)
    app.config(routeConfig);
    angular.bootstrap(document, ['app']);
});