/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function saleListCtrl($scope, $routeParams, $location, $http) {
        //初始化变量完成
        $scope.saleList=[];
        for(var i=0;i<10;i++){
            $scope.saleList[i]={
                itemId:i+i,
                itemInfo:"苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
                itemImg:"/images/item_detail/iphone6.png",
                itemPrice:"4788.00",
                itemInstallation:"220.94",
                itemCycle:24,
                saleState:true,
            };
        }
    }

    saleListCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return saleListCtrl;
});