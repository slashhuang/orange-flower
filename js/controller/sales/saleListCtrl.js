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
        $scope.desc =true;
        //设定url
        var saleListUrl = $rootScope.prefuri + "/product/query";

        //通用函数

        //初始化http请求@TODO需要加入参数

        var render_data = function(){
            $http({
                "method":"post",
                "url":saleListUrl+"/"+1,
                "data":{
                    "sortType": $scope.sortType,
                    "catId":$scope.catId,
                    "keyword":"",
                    "desc": $scope.desc
                }
            }).success(function(data){
                //console.log(data);
                $scope.debugLog(data);
                $scope.saleList =data.content;
            }).error(function(){
            });
        };
        //初始化数据

        render_data();


        $scope.sortData = function(sortType,bool){
            bool=!bool
            $scope.sortType=sortType;
            $scope.desc=bool;
            render_data();
        };
    }

    saleListCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return saleListCtrl;
});