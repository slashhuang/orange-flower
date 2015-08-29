//配置路由
define(['angular','./billMainCtrl','./billPlainCtrl'],
    function(angular,billMainCtrl,billPlainCtrl){
        var orderModule = angular.module('billModule',["ngRoute"]);
        orderModule.controller('billMainCtrl',billMainCtrl);
        orderModule.controller('billPlainCtrl',billPlainCtrl);
    });