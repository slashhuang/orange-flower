//配置路由
define(['angular','./categoryCtrl','./detailCtrl','./discountCtrl','./saleListCtrl','./searchCtrl'],
    function(angular,category,detail,discount,saleList,search,iscroll){
    var salesModule = angular.module('salesModule',["ngRoute"]);
        salesModule.controller('categoryCtrl',category);
        salesModule.controller('detailCtrl',detail);
        salesModule.controller('discountCtrl',discount);
        salesModule.controller('saleListCtrl',saleList);
        salesModule.controller('searchCtrl',search);

        /*cut指令迁移至filters*/

        //var App = angular.module('App', ['ng-scroller']);
        //
        //App.controller('Controller', function($scope){
        //});

});