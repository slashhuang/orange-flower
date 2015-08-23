/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function categoryCtrl($scope,$routeParams,$location,$http){
        var categoryUrl = prefuri+"/dict/product_category"
        //统一Ajax请求
        $scope.category={
            saleNav:[],
            itemInfo:[],
        };
        //页面载入请求
        $http({
            "method":"get",
            "url":categoryUrl,
        }).success(function(data){
            console.log(data);
            console.log("getting category data succeed");
            $scope.category.saleNav =data.items;
            for(var i=0;i<data.items.length;i++){
                $scope.category.saleNav[i].isActive = false;
                if(i==0){
                    $scope.category.saleNav[i].isActive = true;
                }
            }
        }).error(function(){
            alert("请求失败")
        });
        //恢复左侧导航栏默认点击样式
         var changeStyle = function(){
             for(var i=0;i< $scope.category.saleNav.length;i++){
                 $scope.category.saleNav[i].isActive = false;
             }
         };
        //寻找index
        var findIndex = function(id){
            var index = -1;
            angular.forEach($scope.category.saleNav,function(item,key){
                if(item.id === id){
                    index = key;
                }
            });
            return index;
        };
        //点击触发请求
        $scope.AjaxHttp = function(key){
            changeStyle();
            $scope.category.saleNav[findIndex(key)].isActive = true;
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