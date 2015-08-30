/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function categoryCtrl($scope,$routeParams,$location,$http,$rootScope){
        //通用url
        var categoryUrl = $rootScope.prefuri+"/dict/product_category";

        //**** 通用函数

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


        //数据收集
        $scope.category={
            saleNav:[],
            itemInfo:[]
        };

        //页面载入请求
        $http({
            "method":"get",
            "url":categoryUrl
        }).success(function(data){
            $scope.category.saleNav =data.items;
        }).error(function(){
        });


        //分配左侧导航栏click函数变量,并初始化为0
        $scope.watchClick = 0;


        //页面样式函数
        $scope.active = function(id){
            var classType = ['active','disable',"last"];
            if($scope.watchClick == findIndex(id)&& findIndex(id)== $scope.category.saleNav.length-1 ){
                return classType[2]
            }
            else{
                if($scope.watchClick == findIndex(id)){
                    return classType[0]
                }
                else{
                    return classType[1]
                }
            }
        };

        //统一http请求

        //初始化查询数据
        $scope.pageId=0;
        $scope.sortType="DEFAULT";
        $scope.catId=0;
        $scope.keyword="";

        var queryProduct = function(key){
            var DATAsettings = {
                "sortType": $scope.sortType,
                "catId":key,
                "keyword":$scope.keyword
            };
            $http({
                "method":"post",
                "url":$rootScope.prefuri+"/product/query/0",
                "data":DATAsettings
            }).success(
                function(response, status, headers, config){
                    console.log(response);
                    $scope.category.itemInfo = response.content;
                }).error(
                function(res){
                    console.log(res)
                });
        };

        //点击触发请求
        $scope.searchProduct = function(key){
            $scope.watchClick = findIndex(key);
            queryProduct(key)
        };

    };
    categoryCtrl.$inject=['$scope','$routeParams','$location','$http','$rootScope'];

    return categoryCtrl;
});