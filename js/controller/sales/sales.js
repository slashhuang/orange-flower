//配置路由
define(['angular','./categoryCtrl','./detailCtrl','./discountCtrl','./saleListCtrl','./searchCtrl'],
    function(angular,category,detail,discount,saleList,search){
    var salesModule = angular.module('salesModule',["ngRoute"]);
        salesModule.controller('categoryCtrl',category);
        salesModule.controller('detailCtrl',detail);
        salesModule.controller('discountCtrl',discount);
        salesModule.controller('saleListCtrl',saleList);
        salesModule.controller('searchCtrl',search);

        //salesModule.directive('setFocus', function(){
        //    return function(scope, element){
        //        element[0].focus();
        //    };


});