/**
 * Created by slashhuang on 15/8/21.
 */
define(["zepto", "util/swiper_"], function ($, swiper) {
    //定义商品分类controller
    function detailCtrl($scope, $routeParams, $location, $http, $timeout, $rootScope) {

        //暂时混用javascript,设置悬浮样式
        var detailDomFunc = function () {
            //滚动至顶部
            window.scrollTop = 0;

            var window_height = window.screen.height;
            var $item_slider_content = $(".item-slider-wrapper").eq(0);
            var $item_slider_window = $(".item-slider-window").eq(0);
            var top_dist = document.getElementById("itemSliderNav").offsetTop;
            var content_height = $item_slider_content.offset().height;
            $(window).scroll(function () {
                var scrollListener = function (ele) {
                    if ($(window).scrollTop() > top_dist) {
                        $(ele).css({
                            "position": "fixed",
                            "top": "0",
                            "left": "0",
                            "z-index": "999"
                        }).addClass("slider-active-fix-style");
                    }
                    else {
                        $(ele).css({
                            "position": "",
                            "top": "",
                            "left": "",
                            "z-index": ""
                        }).removeClass("slider-active-fix-style");
                    }
                };
                scrollListener("#itemSliderNav")
            });
            //确保选项卡高度足够
            $item_slider_content.css("min-height", window_height);
            $item_slider_window.css("min-height", content_height);
        };

        //暂时混用javascript,设置悬浮样式


        //获取参数渲染页面
        var itemID = $routeParams.detailId;

        //统一URL
        var detailUrl = $rootScope.prefuri + "/product/" + itemID;


        /*******通用函数
         *@param data 数组
         * @param id 查询参数
         * @returns {number}
         */
        var findIndex = function (id, data) {
            var index = -1;
            angular.forEach(data, function (item, key) {
                if (item.id === id) {
                    index = key;
                }
            });
            return index;
        };
        /*查询颜色选项
         *@param data 数组
         * @param id 查询参数
         * @returns {number}
         */
        var findColorIndex = function (data) {
            var index = -1;
            angular.forEach(data, function (item, key) {
                if (item.selected) {
                    index = item.id;
                }
            });
            return index;
        };

        /**
         *
         * @param state
         */
        $scope.activeShowFrame = function (state) {
            if (state) {
                $scope.showFrame = false;
            }
            else {
                $scope.showFrame = true;
            }
        };
        /**
         *
         * @param min
         * @param max
         * @returns {Array}
         */

        $scope.monthSelector = function (min, max) {
            var monthArray = [];
            for (var i = min - 1; i < max; i++) {
                monthArray[i] = parseInt(min) + parseInt(i);
            }
            return monthArray;
        };

        /**
         * 检测输入和计算月付
         * @param finalMonth
         * @param firstTimePay
         */
        $scope.calculate = function (finalMonth, firstTimePay) {
            if ((/^[+-]?\d+(\.\d+)?$/).test(firstTimePay)) {
                $scope.firstTimePay = firstTimePay;
                $scope.calculateMoney = (($rootScope.transferPrice($scope.saleDetail.price) - firstTimePay) / finalMonth).toFixed(2);
            } else {
                $scope.firstTimePay = "";
                $scope.calculateMoney = (($rootScope.transferPrice($scope.saleDetail.price) - 0) / finalMonth).toFixed(2);
            }
        };

        /**
         * 改变三角形style
         * @param index
         */
        $scope.changeTrianlge = function (index) {
            var triangleClass = ["item-canvas-firstTime", "item-canvas-secondTime", "item-canvas-thirdTime"];
            switch (index) {
                case 0:
                    return triangleClass[0];
                case 1:
                    return triangleClass[1];
                case 2:
                    return triangleClass[2];
                default:
                    return triangleClass[0];
            }
        };

        /**
         * 设置选中的颜色
         * @param id
         */
        $scope.setSelectedColor = function (id) {
            $scope.selectedColorId = id;
            _reRend($scope.saleDetail.id, [$scope.selectedColorId, $scope.selectedShapeId]);
        };

        /**
         * 设置选中的形状
         * @param id
         */
        $scope.setSelectedShape = function (id) {
            $scope.selectedShapeId = id;
            _reRend($scope.saleDetail.id, [$scope.selectedColorId, $scope.selectedShapeId]);
        };

        //初始化http请求+变量
        $http({
            "method": "post",
            "url": detailUrl
        }).success(function (data) {
            console.log(data);
            $scope.saleDetail = data;
            $timeout(function () {
                swiper.mainItem();
                swiper.picture();
                detailDomFunc();
            }, 200);

            /***初始化自己设置的变量*/
            $scope.firstTimePay = "0";//    首付

            $scope.itemColors = $scope.saleDetail.attrs[0];//颜色
            $scope.itemShapes = $scope.saleDetail.attrs[1];//外形
            $scope.detailImages = $scope.saleDetail.pictures;

            ///@TODO直接请求数据，不用自己写动作
            $scope.selectedColorId = findColorIndex($scope.itemColors.items);
            $scope.selectedShapeId = findColorIndex($scope.itemShapes.items);

            // [选择价格月份]
            $scope.finalMonth = $scope.saleDetail.minMonth;
            $scope.maxFirst = $scope.transferPrice(data["maxPay"]);
            $scope.minFirst = $scope.transferPrice(data["minPay"]);
            //console.log(typeof $scope.salePrice.price);
            $scope.calculateMoney = $rootScope.transferPrice($scope.saleDetail.price);


        }).error(function () {
        });

        //初始化数据
        $scope.showFrame = false;

        /**
         * 立即购买
         * ->已经登录,发送请求创建订单跳转到确认订单页面
         * ->未登录,跳转到登录页,让他登录
         */
        $scope.buyNow = function () {
            var dataSubmit = $scope.saleDetail,
                info = $scope;

                //  已经登录的情况,创建订单
                //if(!(info["firstTimePay"] >= $scope.transferPrice(info["minFirst"]) && info["firstTimePay"] <= $scope.transferPrice(info["maxFirst"]))){
                //    alert("首付必须在" + $scope.transferPrice(info["minFirst"]) + " 元~" + $scope.transferPrice(info["maxFirst"]) + "元之间!!!");
                //    return;
                //}
                var data = {
                    "orderType": "FORWARD",                         //  订单类型
                    "orderLineDtos": [
                        {
                            "orderType": "FORWARD",                 //  订单类型
                            "realPayAmount": 6,                     //  实付款/退款
                            "skuId": dataSubmit["id"],                 //  商品sku
                            "saleVolume": 1,                     //  销售数量
                            "periods": info["finalMonth"],                           //  分期期数
                            "firstPay": info["firstTimePay"] * 100,                          //  首付金额
                            "clientRemark": ""                   //  每期支付金额
                        }
                    ]
                };

                $http({
                    "method": "post",
                    "url": $rootScope.prefuri + "/order/create",
                    "data": data,
                }).success(function (res) {
                    location.href = "/order/confirm?orderId=" + res;
                }).error($rootScope.httpError);
        };


        /**
         * 根据商品id等信息重新发送信息
         * @param productId
         * @param datas
         * @private
         */
        function _reRend(productId, datas) {
            var str = "/";
            angular.forEach(datas, function (item, index) {
                str += "-" + item;
            });
            $http({
                "method": "post",
                "url": $rootScope.prefuri + "/product/" + productId + str
            }).success(function (res) {
                $scope.saleDetail = res;
                $scope.itemColors = $scope.saleDetail.attrs[0];//颜色
                $scope.itemShapes = $scope.saleDetail.attrs[1];//外形
            }).error(function (err) {
            });
        }

        $scope.setTapIndex = function(num){
            $scope.tapIndex = num;
        }

    }

    detailCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout', '$rootScope'];
    return detailCtrl;
});