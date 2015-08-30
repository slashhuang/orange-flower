/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function saleListCtrl($scope, $routeParams, $location, $http,$rootScope) {

        //设定路由参数
        $scope.title = $routeParams.listName;

        //初始化数据
        $scope.catId = $routeParams.listId;
        $scope.sortType = "DEFAULT";
        $scope.keyword = "";
        //设定url
        var saleListUrl = $rootScope.prefuri + "/product/query";

        //通用函数

        //初始化http请求@TODO需要加入参数
        $http({
            "method":"post",
            "url":saleListUrl+"/"+0,
            "data":{
                "sortType": $scope.sortType,
                "catId":$scope.catId,
                "keyword":""
            }
        }).success(function(data){
            //console.log(data);
            $scope.debugLog(data);
            $scope.saleList =data.content;
        }).error(function(){
        });

        //设置排序
        $scope.filterWay="";
        $scope.changeFilter= function(params){
            $scope.filterWay = params;
        };
    }

    saleListCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return saleListCtrl;
});