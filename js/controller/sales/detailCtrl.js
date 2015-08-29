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
                }
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
            //document.getElementsByTagName("body")[0].style.position = fixed;
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
                monthArray[i] = min + i;
            }
            return monthArray;
        };

        /**
         * 计算月份公式
         * @param finalMonth
         * @param firstTimePay
         */
        $scope.calculate = function (finalMonth, firstTimePay) {
            console.log(firstTimePay + "----" + finalMonth);
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
         *设置选中的颜色
         * @param tags
         */
        //TODO 这边先不用写动作，直接请求数据后渲染
        $scope.setSelectedColor = function (id) {
            $scope.selectedColorId = id;
        };
        $scope.setSelectedShape = function (id) {
            $scope.selectedShapeId = id;
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
            $scope.itemColors = $scope.saleDetail.attrs[0];//颜色
            $scope.itemShapes = $scope.saleDetail.attrs[1];//外形


            ///@TODO直接请求数据，不用自己写动作
            $scope.selectedColorId = findColorIndex($scope.itemColors.items);
            $scope.selectedShapeId = findColorIndex($scope.itemShapes.items);

            console.log('color=' + $scope.selectedColorId + 'shape' + $scope.selectedShapeId);

            // [选择价格月份]
            $scope.finalMonth = $scope.saleDetail.minMonth;
            $scope.firstTimePay = "0";
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
            var data = $scope.saleDetail;
            //  取得本商品的相关数据

            $rootScope.isLogin = true;
            if ($rootScope.isLogin) {
                //  已经登录的情况,创建订单
                $http({
                    "url": $rootScope.prefuri + "/order/create",
                    "method": "post",
                    "params": {
                        "orderType": "FORWARD",                         //  订单类型
                        "sellerId": data["id"],                         //  商家id
                        "saleAmount": 1,                                //  销售总额
                        "payAmount": data["price"],                     //  应付总额
                        "realPayAmount": 2,                             //  实付总额
                        "mobile": "string",                             //  用户电话
                        "addressId": 2,                                 //  配送地址
                        "orderLineDtos": [
                            {
                                "clientType":"WEIXIN",                  //  客户端类型
                                "orderType": "FORWARD",                 //  订单类型
                                "sellerId": data["id"],                 //  商家id
                                "saleAmount": 1,                        //  销售额/退款额
                                "payAmount": 1,                         //  应付金额
                                "realPayAmount": 6,                     //  实付款/退款
                                "skuId": data["skuId"],                 //  商品sku
                                "salePrice": data["price"],             //  销售单价
                                "saleVolume": "个",                     //  销售数量
                                "saleUnit": "string",                   //  销售单位
                                "periods": 3,                           //  分期期数
                                "firstPay": 0,                          //  首付金额
                                "prePeriodsPay": 2,                     //  每期支付金额
                                "clientRemark": "string",               //  客户备注
                                "commodityName": data["title"],         //  商品名称
                                "commodityIcon": "string",              //  商品图标
                                "commodityType": 1                      //  商品类型
                            }
                        ]
                    }
                }).success(function (res) {
                    location.hash = "/order/confirm?orderId=" + 2015082017361234;
                }).error(function (err) {
                });
            } else {
                //  未登录的情况,跳转到登录页
                location.hash = "/login";
            }
        };


        /**
         * 根据商品id等信息重新发送信息
         * @param productId
         * @param itemId
         * @private
         */
        function _reRend(productId,itemId){
            $http({
                "method":"post",
                "url":$rootScope + "/product/" + productId + itemId
            }).success(function(res){
                $scope.data = res;
            }).error(function(err){});
        }

    };
    detailCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout', '$rootScope'];
    return detailCtrl
});