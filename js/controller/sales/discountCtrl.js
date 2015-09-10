/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function detailCtrl($scope, $routeParams, $location, $http,$rootScope) {

        $http({
            "url":$scope.prefuri + "/product/listActivities/XSTM",
            "method":"POST"
        }).success(function(res){

            $scope.discountList = _rendData(res);

        }).error($scope.httpError);


        //通用函数
        //初始化变量完成
        //$scope.discountList = [];
        //for (var i = 0; i < 10; i++) {
        //    $scope.discountList[i] = {
        //        itemID:i+i,
        //        itemInfo: "苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
        //        itemImg: "/images/item_detail/iphone6.png",
        //        itemPrice: "4788.00",
        //        itemOldPrice: "4688.00",
        //        itemInstallation: "220.94",
        //        itemCycle: 24,
        //        discount: {
        //            firstTime: 300,
        //            payOncePercent: [20, 300]
        //        },
        //        saleState: true,
        //        timeCountDown: new Date().toLocaleString(),
        //        numLeft: 0
        //    };
        //}

        /**
         * 循环对象遍历数据
         * @param data
         * @private
         */
        function _rendData(data){
            var arrs = [],
                curPrice = 0,
                now = Date.now(),
                newProduct = false,
                hotProduct = false,
                start,end;
            angular.forEach(data,function(item){
                start = item["activity"]["startTime"];
                end = item["activity"]["end"];
                curPrice = item["price"];
                if(item["activity"] != null && now >= start && now <= end){
                    curPrice = parseInt(item["price"] - item["activity"]["discount"]);
                }
                angular.forEach(item["tags"],function(tag){
                    if(tag["value"] == "热卖"){
                        hotProduct = true;
                    }else if(tag["value"] == "新品"){
                        newProduct = true;
                    }
                });
                //  新品或者热卖
                arrs.push({
                    "now":now,                                      //  当前时间
                    "activity":item["activity"],                    //  活动信息
                    "itemID":item["id"],                            //  商品Id
                    "itemInfo": item["title"],                      //  标题
                    "new":newProduct,                               //  新品
                    "hot":hotProduct,                               //  热卖
                    "itemImg": item["thumb"]["smallUrl"],           //  预览图
                    "itemPrice": curPrice,                          //  当前售价
                    "itemOldPrice": item["price"],                  //  原价
                    "itemInstallation": item["pricePerMonth"],
                    "itemCycle": item["month"],
                    "discount": {
                        "firstTime": 300,
                        "payOncePercent": [20, 300]
                    },
                    "saleState": true,
                    "timeCountDown": new Date().toLocaleString(),
                    "numLeft": item["left"]
                });
            });
            return arrs;
        }

    }

    detailCtrl.$inject = ['$scope','$routeParams', '$location', '$http','$rootScope'];
    return detailCtrl
});