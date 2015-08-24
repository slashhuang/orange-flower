//配置路由
define(['angular','./orderListCtrl','./orderDetailCtrl','./orderConfirmCtrl','./orderInfoCtrl','./orderReasonCtrl'],
    function(angular,list,detail,confirm,info,reason){
    var orderModule = angular.module('orderModule',["ngRoute"]);
        orderModule.controller('orderListCtrl',list);
        orderModule.controller('orderDetailCtrl',detail);
        orderModule.controller('orderConfirmCtrl',confirm);
        orderModule.controller('orderInfoCtrl',info);
        orderModule.controller('orderReasonCtrl',reason);
});