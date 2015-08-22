/**
 * Created by slashhuang on 15/8/21.
 */
define([
    'angular',
    'config/routeConfig',
    'lib/angular-route',
    'controller/sales/sales',
    'controller/order/order'],function(angular,routeConfig){
    var app = angular.module('app',["ngRoute","salesModule","orderModule"]);
    //配置路由
    //console.log(app)
    app.config(routeConfig);
    angular.bootstrap(document, ['app']);
});