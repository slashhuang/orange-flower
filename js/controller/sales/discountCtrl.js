/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function detailCtrl($scope, $routeParams, $location, $http,$rootScope) {

        //通用函数

        //初始化变量完成
        $scope.discountList = [];
        for (var i = 0; i < 10; i++) {
            $scope.discountList[i] = {
                itemID:i+i,
                itemInfo: "苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
                itemImg: "/images/item_detail/iphone6.png",
                itemPrice: "4788.00",
                itemOldPrice: "4688.00",
                itemInstallation: "220.94",
                itemCycle: 24,
                discount: {
                    firstTime: 300,
                    payOncePercent: [20, 300]
                },
                saleState: true,
                timeCountDown: new Date().toLocaleString(),
                numLeft: 0
            };
        }

    }

    detailCtrl.$inject = ['$scope','$routeParams', '$location', '$http','$rootScope'];
    return detailCtrl
});