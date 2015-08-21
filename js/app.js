/**
 * Created by slashhuang on 15/8/21.
 */
define(['angular','config/routeConfig','lib/angular-route','controller/sales/sales'],function(angular,routeConfig){
    var app = angular.module('app',["ngRoute","salesModule"]);
    //配置路由
    //console.log(app)
    app.config(routeConfig);
    angular.bootstrap(document, ['app']);
});