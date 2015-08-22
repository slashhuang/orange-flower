/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function categoryCtrl($scope,$routeParams,$location,$http){
        //统一Ajax请求
        $scope.category={
            saleNav:[],
            itemInfo:[],
        };
        //页面载入请求
        $http({
            "method":"get",
            "url":prefuri+"/dict/product_category"
        }).success(function(data){
            console.log(data);
            console.log("getting category data succeed");
            $scope.category.saleNav =data.items;
        }).error(function(){
            alert("请求失败")
        });

        //点击触发请求
        $scope.AjaxHttp = function(key){
            $http({
                "method":"post",
                "url":prefuri+"/product/query",
                "data":{
                    "sortType": "DEFAULT",
                    "keyword": "string",
                    "catId": 1
                },
            }).success(function(response, status, headers, config){
                console.log("点击获取数据请求成功")
            }).error(function(){

            });
        };

        for(var i=0;i<10;i++){
            $scope.category.itemInfo[i]={
                img:"/images/item_detail/iphone6.png",
                detail:"苹果 iPhone6"
            };
        };

    };
    categoryCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return categoryCtrl;
});