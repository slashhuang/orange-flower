/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function detailCtrl($scope,$routeParams,$location,$http){
        var itemID= $routeParams.detailId;
        var detailUrl = prefuri+"/product/"+itemID
        //初始化http请求
        $http({
            "method":"post",
            "url":detailUrl
        }).success(function(data){
            $scope.saleDetail = data;
            console.log(data);
        }).error(function(){
        });

        //初始化变量完成
        $scope.saleDetail={
            itemImg:"/images/item_detail/iphone6.png",
        };
    };
    detailCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return detailCtrl
});