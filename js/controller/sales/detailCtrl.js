/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function detailCtrl($scope,$routeParams,$location,$http){
        $http.get('' + '' + '').success(function(data) {
            $scope.test = $routeParams.detailId;
            console.log("商品信息路由测试" + $scope.test)
        });
        //初始化变量完成
        $scope.saleDetail={
            itemInfo:"苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
            itemImg:"/images/item_detail/iphone6.png",
            itemPrice:"4788.00",
            itemInstallation:"220.94",
            itemCycle:24,
            saleState:true,
        };
    };
    detailCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return detailCtrl
});