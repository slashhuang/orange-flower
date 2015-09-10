/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function detailCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {

        /**
         * 配置刷新加载
         * @type {Element}
         */
        var dragButton = document.getElementById("refreshButton");
        var refreshHint = document.getElementById("refreshHint");
        var refreshImg = document.getElementById("refreshImg");
        var callback = function (dd) {
            dragButton.style.marginTop=0;
            refreshImg.style.top=0;
            refreshHint.innerHTML="努力加载中";
            $timeout(function(){
                switch(dd.last){
                    case true:
                        refreshHint.innerHTML="已是最后一页";
                        $timeout(function(){
                            $scope.showRefresh = false;
                        },1000);
                        break;
                    case false:
                        refreshHint.innerHTML="上拉刷新";
                        $scope.showRefresh = true;
                        break;
                }
            },500);
        };


        (function () {
            var startPosition, endPosition, deltaY;
            dragButton.addEventListener('touchstart', function (e) {
                var touch = e.touches[0];
                startPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                }
            });
            dragButton.addEventListener('touchmove', function (e) {
                var touch = e.touches[0];
                endPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                deltaY = startPosition.y-endPosition.y;

                if(deltaY>60&&deltaY<80){
                    refreshHint.innerHTML="释放加载数据";
                    dragButton.style.marginTop=deltaY+'px';
                    refreshImg.style.top=-deltaY+'px'
                }
                if(deltaY>10&&deltaY<60){
                    refreshHint.innerHTML="上拉刷新";
                    dragButton.style.marginTop=deltaY+'px';
                    refreshImg.style.top=-deltaY+'px'
                }

            });
            dragButton.addEventListener('touchend',function (e) {
                var touch = e.touches[0];
                if(deltaY>=60){
                    $scope.refresh();
                }
                else{
                    callback()
                }
            });
        })();

        $scope.showRefresh = true;
        $scope.curPage = 0;

        $http({
            "url":$scope.prefuri + "/product/queryActivities/XSTM/" + $scope.curPage,
            "method":"POST"
        }).success(function(res){

            $scope.discountList = _rendData(res.content);
            //$scope.showRefresh = false;
            refreshHint.innerHTML = "上拉刷新";
        }).error(function(err){
            //$scope.showRefresh = false;
            $scope.httpError(err);
        });


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
         * 刷新数据
         * @param callback
         */
        $scope.refresh = function(callback){
            $scope.curPage += 1;
            $http({
                "url":$scope.prefuri + "/product/queryActivities/XSTM/" + $scope.curPage,
                "method":"POST"
            }).success(function(res){
                if(res.content.length == 0){
                    $scope.showRefresh = false;
                }
                $scope.discountList = $scope.discountList.concat(_rendData(res.content));
            }).error(function(err){
                //$scope.showRefresh = false;
                $scope.httpError(err);
            });
        };

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
                //if(item["activity"] != null && now >= start && now <= end){
                //    curPrice = parseInt(item["price"] - item["activity"]["discount"]);
                //}
                curPrice = parseInt(item["price"] - item["activity"]["discount"] * 100);
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

    detailCtrl.$inject = ['$scope','$routeParams', '$location', '$http','$rootScope','$timeout'];
    return detailCtrl
});