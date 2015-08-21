//配置路由
define(['angular','./categoryCtrl','./detailCtrl','./discountCtrl','./saleListCtrl'],
    function(angular,category,detail,discount,saleList){
    var salesModule = angular.module('salesModule',["ngRoute"]);
        salesModule.controller('categoryCtrl',category);
        salesModule.controller('detailCtrl',detail);
        salesModule.controller('discountCtrl',discount);
        salesModule.controller('saleListCtrl',saleList);
});