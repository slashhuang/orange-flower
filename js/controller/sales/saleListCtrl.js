/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function saleListCtrl($scope, $routeParams, $location, $http) {


        console.log($routeParams);

        //设定路由参数
        $scope.title = $routeParams.listName;
        $scope.checkListId = $routeParams.listId;

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

        //设置排序
        $scope.filterWay="";
        $scope.changeFilter= function(params){
            $scope.filterWay = params;
        };

        $scope.saleList=[];
        for(var i=0;i<10;i++){
            $scope.saleList[i]={
                itemId:i+i,
                itemInfo:"苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
                itemImg:"/images/item_detail/iphone6.png",
                itemPrice:"4788.00",
                itemInstallation:"220.94",
                itemCycle:24,
                saleState:true,
            };
        }
    }

    saleListCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return saleListCtrl;
});