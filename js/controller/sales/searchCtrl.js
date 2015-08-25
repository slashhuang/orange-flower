/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function searchCtrl($scope, $routeParams, $location, $http) {

        //初始化数据
        $scope.searchFinished = true;

        $scope.searchProduct = function(query){
            console.log(query);
            $http({
                "method":"post",
                "url":prefuri,
                "data":{},
            }).success(function(data){
                $scope.searchFinished = false
                //alert("test succeed")
            }).error(function(){
                alert("test")
            });
        };




        //设定url
        var saleListUrl = prefuri + "/product/query";

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
            "data":{catId:$scope.checkListId},
        }).success(function(data){
            console.log(data);
            //$scope.saleList =data.content;
        }).error(function(){
        });
        
    }

    searchCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return searchCtrl;
});