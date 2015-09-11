/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function() {
    //定义商品分类controller
    function detailCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {

        var check = null;
        //  检查定时器

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
                //switch(dd.last){
                //    case true:
                //        refreshHint.innerHTML="已是最后一页";
                //        $timeout(function(){
                //            $scope.showRefresh = false;
                //        },1000);
                //        break;
                //    case false:
                //        refreshHint.innerHTML="上拉刷新";
                //        $scope.showRefresh = true;
                //        break;
                //}
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
            });
        })();

        $scope.showRefresh = true;
        $scope.curPage = 0;

        $http({
            "url":$scope.prefuri + "/product/queryActivities/XSTM/" + $scope.curPage,
            "method":"POST"
        }).success(function(res){

            console.log(res);

            $scope.discountList = _rendData(res.content);
            _rendTime();
            //$scope.showRefresh = false;
            refreshHint.innerHTML = "上拉刷新";
        }).error(function(err){
            //$scope.showRefresh = false;
            $scope.httpError(err);
        });

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
                _rendTime();
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
                progress,start,end;
            angular.forEach(data,function(item){
                start = item["activity"]["startTime"];
                end = item["activity"]["end"];
                curPrice = item["price"];
                curPrice = parseInt(item["pagePrice"] - item["activity"]["discount"] * 100);
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
                    "pagePrice": item["pagePrice"],                  //  页面显示价格
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

        /**
         * 倒计时
         * @private
         */
        function _rendTime(){
            clearInterval(check);
            var now = Date.now(),
                disCount = $scope.discountList;
            _interVal(disCount);
            check = setInterval(function(){
                now = Date.now();
                $scope.$apply(function(){
                    _interVal(disCount);
                });
                //  执行脏检查,通知view层
            },1000);
        }

        /**
         * 定时器更新时间算法
         * @param disCount
         * @private
         */
        function _interVal(disCount){
            angular.forEach(disCount,function(item,index){
                var now = Date.now(),
                    start = item["activity"]["startTime"],
                    end = item["activity"]["endTime"],
                    progress;
                if(now >= start && start <= end) {
                    $scope.discountList[index]["progress"] = "ING";
                    var youtime = end - now;
                    var seconds = youtime / 1000;
                    var minutes = Math.floor(seconds / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);
                    var CHour = hours % 24;
                    var CMinute = minutes % 60;
                    var CSecond = Math.floor(seconds % 60);
                    var CMSecond = Math.floor(seconds * 100 % 100);
                    $scope.discountList[index]["timeInfo"] = "倒计时" + days + "天" + CHour + ":" + CMinute + ":" + CSecond;
                }else if(now < start){
                    $scope.discountList[index]["timeInfo"] = "还未开始,敬请期待!";
                }else{
                    $scope.discountList[index]["timeInfo"] = "你来晚啦!";
                }
            });
        }

    }

    detailCtrl.$inject = ['$scope','$routeParams', '$location', '$http','$rootScope','$timeout'];
    return detailCtrl
});