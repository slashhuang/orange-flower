//配置路由
define(['angular','./categoryCtrl','./detailCtrl','./discountCtrl','./saleListCtrl','./searchCtrl'],
    function(angular,category,detail,discount,saleList,search){
    var salesModule = angular.module('salesModule',["ngRoute"]);
        salesModule.controller('categoryCtrl',category);
        salesModule.controller('detailCtrl',detail);
        salesModule.controller('discountCtrl',discount);
        salesModule.controller('saleListCtrl',saleList);
        salesModule.controller('searchCtrl',search);

        salesModule.filter('cut', function () {
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