//配置路由
define(['angular','./orderListCtrl','./orderDetailCtrl','./orderConfirmCtrl'],
    function(angular,list,detail,confirm){
    var orderModule = angular.module('orderModule',["ngRoute"]);
        orderModule.controller('orderListCtrl',list);
        orderModule.controller('orderDetailCtrl',detail);
        orderModule.controller('orderConfirmCtrl',confirm);
});