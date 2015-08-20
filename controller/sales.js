/**
 * Created by slashhuang on 15/8/16.
 */
var saleController = angular.module("saleController",[]);
//定义商品分类controller
saleController.controller('saleCategory', ['$scope', '$http',
    function($scope, $http) {
        $scope.category={
            saleNav:["苹果手机","安卓手机","手机配件","潮流数码","平板电脑","手提电脑","视频摄像"],
            itemInfo:[],
        };
        for(var i=0;i<10;i++){
            $scope.category.itemInfo[i]={
                img:"/images/item_detail/iphone6.png",
                detail:"苹果 iPhone6"
            };
        }
    }]);
