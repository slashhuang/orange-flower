/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function categoryCtrl($scope,$routeParams,$location,$http){
        //通用url
        var categoryUrl = prefuri+"/dict/product_category";
        /**
         * 根据hash区分是第几个tab
         * @param cur
         */
        $scope.addActive = function(cur){
            var hash = location.hash;
            if(hash.indexOf(cur) > 0){
                return "active";
            }
            return "";
        };

        //**** 通用函数
        /**
         * 价格转换器
         * @param price
         * @returns {string}
         */
        $scope.transferPrice = function(price){
            return (price / 100).toFixed(2);
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


        //数据收集
        $scope.category={
            saleNav:[],
            itemInfo:[]
        };

        //页面载入请求
        $http({
            "method":"get",
            "url":categoryUrl,
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
        var queryProduct = function(key){
            $http({
                "method":"post",
                "url":prefuri+"/product/query/0",
                "data":{
                    "sortType": "DEFAULT",
                    "catId": key
                }
            }).success(
                function(response, status, headers, config){
                    console.log(response)
                    $scope.category.itemInfo = response.content;
                }).error(
                function(res){
                    console.log(res)
                });
        }

        //点击触发请求
        $scope.AjaxHttp = function(key){
            $scope.watchClick = findIndex(key);
            queryProduct(key)
        };

    };
    categoryCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return categoryCtrl;
});