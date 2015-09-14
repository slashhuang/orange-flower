//配置路由
define(['angular','./activityCtrl','./lotteryCtrl','./lotteryMainCtrl'],
    function(angular,activityCtrl,lotteryCtrl,lotteryMainCtrl){
        var activityModule = angular.module('activityModule',["ngRoute"]);
        activityModule.controller('activityCtrl',activityCtrl);
        activityModule.controller('lotteryCtrl',lotteryCtrl);
        activityModule.controller('lotteryMainCtrl',lotteryMainCtrl);
    });