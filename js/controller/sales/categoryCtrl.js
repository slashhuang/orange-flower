/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function categoryCtrl($scope,$routeParams,$location,$http){
            //初始化变量完成
            $scope.category={
                saleNav:["苹果手机","安卓手机","手机配件","潮流数码","平板电脑","手提电脑","视频摄像"],
                saleNavStyle:[],
                itemInfo:[],
            };
            for(var i=0;i<5;i++){
                $scope.category.itemInfo[i]={
                    img:"/images/item_detail/iphone6.png",
                    detail:"苹果 iPhone6"
                };
            }
            for(var i=5;i<10;i++){
                $scope.category.itemInfo[i]={
                    img:"/images/item_detail/iphone6.png",
                    detail:"魅族 MX5"
                };

            };
        };
    categoryCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return categoryCtrl;
});