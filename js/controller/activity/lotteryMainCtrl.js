/**
 *   build by rwson 2015-09-14
 *   活动列表控制器
 */
define([], function () {
        function lotteryMainCtrl($scope, $routeParams, $location, $http, $rootScope) {

            var ele = document.querySelector("#light-icon"),
                interval = null;

            $scope.startLottery = function () {
                _runLottery(ele,3,function(){
                });
            };

            /**
             * 转盘块运动
             * @param target
             * @param pos
             * @param callback
             * @private
             */
            function _runLottery(target,pos,callback) {
                var posInfo = [
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
                    index = 0,
                    round = 0;
                clearInterval(interval);
                interval = setInterval(function(){
                    index = index ++ == posInfo.length - 1 ? 0 : index ++;

                    _setStyle(target,posInfo[index]);
                    //  200ms转一圈
                    if(index == 7){
                        clearInterval(interval);
                        round = 0;

                        interval = setInterval(function(){
                            index = index ++ == posInfo.length - 1 ? 0 : index ++;
                            _setStyle(target,posInfo[index]);
                            if(index == 7){
                                round ++;
                            }
                            if(round == 8){
                                clearInterval(interval);
                                round = 0;
                                //  60ms转八圈

                                interval = setInterval(function(){
                                    index = index ++ == posInfo.length - 1 ? 0 : index ++;
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
                                                callback && angular.isFunction(callback) && callback.call(true);
                                            }
                                            //  闪个15下后走回调
                                        },16);
                                    }
                                },300);
                            }
                        },60);
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