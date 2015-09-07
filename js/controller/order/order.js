//配置路由
define(['angular','./orderListCtrl','./orderDetailCtrl','./orderConfirmCtrl','./orderInfoCtrl','./orderReasonCtrl'],
    function(angular,list,detail,confirm,info,reason){
    var orderModule = angular.module('orderModule',["ngRoute"]);
        orderModule.controller('orderListCtrl',list);
        orderModule.controller('orderDetailCtrl',detail);
        orderModule.controller('orderConfirmCtrl',confirm);
        orderModule.controller('orderInfoCtrl',info);
        orderModule.controller('orderReasonCtrl',reason);

        orderModule.filter('cut', function () {
            return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        });
});