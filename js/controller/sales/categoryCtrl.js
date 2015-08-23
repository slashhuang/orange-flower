/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function categoryCtrl($scope,$routeParams,$location,$http){
        var categoryUrl = prefuri+"/dict/product_category"
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
            if(findIndex(key)+1== $scope.category.saleNav.length ){
                //如果是最后一个nav, 去除下边框
                var categoryNav = document.getElementById("categoryNav").children;
                categoryNav[categoryNav.length-1].style.borderBottomWidth=0;
            }
            console.log(key);
            $http({
                "method":"post",
                "url":prefuri+"/product/query",
                "data":{
                    "sortType": "DEFAULT",
                    "catId": key
                },
            }).success(
                function(response, status, headers, config){
                $scope.category.itemInfo = response.content;
                console.log(response)
            }).error(
                function(){
            });
        };

    };
    categoryCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return categoryCtrl;
});