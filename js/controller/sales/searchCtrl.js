/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function searchCtrl($scope, $routeParams, $location, $http) {


        //设定url
        var saleListUrl = prefuri + "/product/query";

        //初始化数据
        $scope.searchFinished = true;

        //初始化查询数据
        $scope.pageId=0;
        $scope.sortType="DEFAULT";
        $scope.catId=0;
        $scope.keyword="";

        $scope.searchProduct = function(){
            var DATAsettings = {
                "sortType": $scope.sortType,
                "catId":$scope.catId,
                "keyword":$scope.keyword
            };
            //@TODO 数据下拉刷新
            $http({
                "method":"post",
                "url":saleListUrl+"/"+ $scope.pageId,
                "data":DATAsettings
            }).success(function(data){
                console.log(data);
                $scope.searchFinished = false
            }).error(function(){
            });
        };


        //通用函数
        /**
         * 价格转换器
         * @param price
         * @returns {string}
         */
        $scope.transferPrice = function(price){
            return (price / 100).toFixed(2);
        };

        //初始化http请求@TODO需要加入参数
        $http({
            "method":"post",
            "url":saleListUrl,
            "data":{
                "sortType": "DEFAULT",
                "catId": 0,
                "keyword": "string"
            },
        }).success(function(data){
            console.log(data);
            //$scope.saleList =data.content;
        }).error(function(){
        });
        
    }

    searchCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return searchCtrl;
});