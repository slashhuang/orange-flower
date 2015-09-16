/**
 *   build by rwson 2015-09-14
 *   活动列表控制器
 */
define([], function () {
        function lotteryMainCtrl($scope, $routeParams, $location, $http, $rootScope) {

            var ele = document.querySelector("#light-icon"),
                interval = null,
                tmpDom = document.querySelector(".icon-1"),
                prefUri = $scope.prefuri,
                posInfo = [
                    {
                        "left": 0,
                        "top": 0
                    },
                    {
                        "left": "33.33%",
                        "top": 0
                    },
                    {
                        "left": "66.66%",
                        "top": 0
                    },
                    {
                        "left": "66.66%",
                        "top": "33.33%"
                    },
                    {
                        "left": "66.66%",
                        "top": "66.66%"
                    },
                    {
                        "left": "33.33%",
                        "top": "66.66%"
                    },
                    {
                        "left": 0,
                        "top": "66.66%"
                    },
                    {
                        "left": 0,
                        "top": "33.33%"
                    }
                ],
                showHide = [
                    {
                        "display":"block"
                    },
                    {
                        "display":"none"
                    }
                ],
                stopIndex = 0,
                index = 0,
                round = 0,
                items,
                isPrice;

            $scope.prizeInfo = "";

            $http({
                "url": prefUri + "/lottery/SLYYJCJ",
                "method":"GET"
            }).success(function(res){
                items = res["items"];
                angular.forEach(items,function(item,index){
                    tmpDom = document.getElementsByClassName("icon-" + item["id"])[0];
                    _setStyle(tmpDom,{
                        "background":"url(" + prefUri + item["file"]["smallUrl"] + ") no-repeat 0 0",
                        "backgroundSize":"100% 100%"
                    });
                });
            }).error($scope.httpError);
            //  ajax返回成功渲染DOM

            $scope.startLottery = function () {
                $http({
                    "url":prefUri + "/lottery/SLYYJCJ/lottery",
                    "method":"POST"
                }).success(function(res){
                    angular.forEach(items,function(item,index){
                        if(res["lotteryItemId"] == item["id"]){
                            stopIndex = index;
                        }
                    });
                    //  获取转到哪里停下来

                    _runLottery(ele,stopIndex,function(){
                        $scope.$apply(function(){
                            $scope.prizeInfo = "恭喜你获得了价值" + $scope.transferPrice(res["productPrice"]) + res["productName"];
                            if(res["productSkuId"] == 0){
                                $scope.prizeInfo = "很遗憾!你没有中奖!再试试手气吧!";
                                $scope.prized = false;
                                isPrice = false;
                            }else{
                                $scope.skuId = res["productSkuId"];
                                $scope.prized = true;
                                $scope.prizeInfo = "恭喜你获得了价值" + $scope.transferPrice(res["productPrice"]) + "元的" + res["productName"];
                                isPrice = true;
                            }
                        });
                    });
                }).error($scope.httpError);
            };

            /**
             * 按钮点击动作
             */
            $scope.btnTaped = function(){
                if(!isPrice){
                    $scope.prizeInfo = "";
                }else{
                    location.href = "/sale/detail/" + $scope.skuId;
                }
            };

            /**
             * 重新抽奖,把变量什么的都设置成
             */
            $scope.reLottery = function(){
                $scope.prizeInfo = "";
                index = 0;
                round = 0;
            };

            /**
             * 转盘块运动
             * @param target
             * @param pos
             * @param callback
             * @private
             */
            function _runLottery(target,pos,callback) {
                clearInterval(interval);
                index = -1;
                round = 0;

                interval = setInterval(function(){
                    index = index ++ == posInfo.length ? 0 : index ++;

                    _setStyle(target,posInfo[index]);
                    //  200ms转一圈
                    if(index == 7){
                        clearInterval(interval);
                        round = 0;

                        interval = setInterval(function(){
                            index = index ++ == posInfo.length ? 0 : index ++;
                            _setStyle(target,posInfo[index]);
                            if(index == 7){
                                round ++;
                            }
                            if(round == 8){
                                clearInterval(interval);
                                round = 0;
                                //  60ms转八圈

                                interval = setInterval(function(){
                                    index = index ++ == posInfo.length ? 0 : index ++;
                                    if(index == 7){
                                        round ++;
                                    }
                                    _setStyle(target,posInfo[index]);
                                    //  300ms转2圈
                                    if(round == 1 && index == pos){
                                        clearInterval(interval);
                                        index = 0;
                                        round = 0;

                                        interval = setInterval(function(){
                                            index = index ++ == showHide.length ? 0 : index ++;
                                            if(index == 1){
                                                round ++;
                                            }
                                            _setStyle(target,showHide[index]);
                                            if(round == 15){
                                                clearInterval(interval);
                                                _setStyle(target,showHide[0]);
                                                callback();
                                            }
                                            //  闪个15下后走回调
                                        },16);
                                    }
                                },300);
                            }
                        },30);
                    }
                },200);
            }

            /**
             * 设置样式
             * @param target
             * @param styles
             * @private
             */
            function _setStyle(target, styles) {
                for (var i in styles) {
                    target.style[i] = styles[i];
                }
            }
        }

        lotteryMainCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$rootScope'];
        return lotteryMainCtrl;
    });