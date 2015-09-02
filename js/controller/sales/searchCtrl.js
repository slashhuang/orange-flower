/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function searchCtrl($scope, $routeParams, $location, $http,$rootScope) {


        //设定url
        var saleListUrl = $rootScope.prefuri + "/product/query";

        //初始化数据
        $scope.nosearch = true;

        $scope.noDataDetection = false;

        //初始化查询数据
        $scope.pageId=0;
        $scope.sortType="DEFAULT";
        $scope.catId="";
        $scope.keyword="";


        $scope.searchProductFUnc = function(data){
            var DATAsettings = {
                "sortType": $scope.sortType,
                "catId":$scope.catId,
                "keyword":data
            };
            $scope.debugLog(DATAsettings);
            $http({
                "method":"post",
                "url":saleListUrl+"/"+ $scope.pageId,
                "data":DATAsettings
            }).success(function(data){
                $scope.debugLog(data);
                if(data.content&&data.content.length){
                    $scope.nosearch = false;
                    $scope.noDataDetection = false
                }
                else{
                    $scope.noDataDetection = true;
                    $scope.nosearch = true;
                }
            }).error($scope.httpError);
        };
        
    }

    searchCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return searchCtrl;
});