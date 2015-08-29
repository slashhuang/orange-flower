/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function searchCtrl($scope, $routeParams, $location, $http,$rootScope) {


        //设定url
        var saleListUrl = $rootScope.prefuri + "/product/query";

        //初始化数据
        $scope.searchWaiting = true;



        $scope.noDataDetection = false;

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


            console.log(DATAsettings)

            $http({
                "method":"post",
                "url":saleListUrl+"/"+ $scope.pageId,
                "data":DATAsettings
            }).success(function(data){
                alert("search success")
                console.log(data);

                if(data.content&&data.content.length){
                    $scope.searchWaiting = false;
                    $scope.noDataDetection = false
                }
                else{
                    $scope.noDataDetection = true;
                    $scope.searchWaiting = true;
                }

            }).error(function(){
            });
        };


        //通用函数


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
        }).error(function(){
        });
        
    }

    searchCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return searchCtrl;
});