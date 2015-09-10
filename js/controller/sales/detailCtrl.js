/**
 * Created by slashhuang on 15/8/21.
 */
define(["zepto", "util/swiper_"], function ($, swiper) {
    //定义商品分类controller
    function detailCtrl($scope, $routeParams, $location, $http, $timeout, $rootScope) {

        var rateInfo = $scope.rateInfo;
        //  缓存全局中的利率信息

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
                        $(ele) && $(ele).css({
                            "position": "fixed",
                            "top": "0",
                            "left": "0",
                            "z-index": "999"
                        }).addClass("slider-active-fix-style");
                    }
                    else {
                        $(ele) && $(ele).css({
                            "position": "",
                            "top": "",
                            "left": "",
                            "z-index": ""
                        }).removeClass("slider-active-fix-style");
                    }
                };
                scrollListener("#itemSliderNav");
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
                $scope.calculateMoney = _calculateRate($scope.firstTimePay, $scope.saleDetail.price, $scope.finalMonth)["monthPay"];
            }
        };

        /**
         * 循环出月份的相关数据
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
            var min = $scope.transferPrice($scope.saleDetail.minPay),
                max = $scope.transferPrice($scope.saleDetail.maxPay);
            if ((/^[+-]?\d+(\.\d+)?/).test(firstTimePay)) {
                if (firstTimePay && firstTimePay >= min && firstTimePay <= max) {
                    $scope.firstTimePay = firstTimePay;
                    $scope.calculateMoney = _calculateRate(firstTimePay, $scope.saleDetail.price, finalMonth)["monthPay"];
                    $scope.monthRate = _calculateRate(firstTimePay, $scope.saleDetail.price, finalMonth)["monthRate"];
                } else {
                    $scope.firstTimePay = max;
                    $scope.calculateMoney = _calculateRate(firstTimePay, $scope.saleDetail.price, finalMonth)["monthPay"];
                    $scope.monthRate = _calculateRate(firstTimePay, $scope.saleDetail.price, finalMonth)["monthRate"];
                }
                //  根据范围内的
            } else {
                $scope.firstTimePay = 0;
                $scope.calculateMoney = _calculateRate(0, $scope.saleDetail.price, finalMonth)["monthPay"];
                $scope.monthRate = _calculateRate(0, $scope.saleDetail.price, finalMonth)["monthRate"];
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
            $scope.saleDetail = data;
            $timeout(function () {
                swiper.mainItem();
                swiper.picture();
                detailDomFunc();
                var table = document.getElementById("productArgs").getElementsByTagName("table")[0],
                    attrs = {
                        "cellpadding": 3,
                        "border": 1,
                        "bordercolor": "#adadad"
                    };
                $scope.debugLog(table.getAttribute("cellspaceing"));
                _setAttr(table, attrs);
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

            $scope.showOffInfo = Object.prototype.toString.apply($scope.saleDetail.activity) == "[object Null]" ? false : true;
            //  是否显示优惠信息

            $scope.debugLog($scope.showOffInfo);

            $scope.activity = data.activity;        //  优惠开始时间、结束时间、优惠多少
            $scope.now = Date.now();                //  现在时间
            $scope.left = data["left"];             //  商品余量

            if ($scope.showOffInfo) {
                var start = parseInt(data.activity.startTime);
                var end = parseInt(data.activity.endTime);
                var now = new Date().getTime();
                var money = parseInt($scope.saleDetail.price);
                if (now >= start && now <= end) {
                    money = parseInt($scope.saleDetail.price) - parseInt(data.activity.discount) * 100;
                }
                $scope.saleDetail.price = money;
                $scope.calculateMoney = $rootScope.transferPrice(money);
            }
            //  根据是否有活动计算当前总价

        }).error(function (err) {
            $rootScope.httpError(err);
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
                },
                activity = dataSubmit["activity"] == null ? "false" : "true";
            //  是否活动

            $http({
                "url": $scope.prefuri + "/user/info",
                "method": "POST"
            }).success(function (res) {
                if (!res) {
                    //return location.href = "/login";
                    return $location.path("/login");
                }
                //  未登录的情况就到登录页

                else if (!res["userAddressList"][0]["address"] && !res["userName"]) {
                    //return location.href = "/registerInfo";
                    return $location.path("/registerInfo");
                }
                //  未完善信息的用户

                localStorage.orderInfo = JSON.stringify({
                    "pagePrice":dataSubmit["pagePrice"],                //  显示价格
                    "uId":res["id"],                                    //  用户Id
                    "skuId":dataSubmit["id"],                                 //  skuId
                    "showBtn":"true",                                        //  是否显示按钮
                    "productId":dataSubmit["id"],                   //  产品id
                    "salePrice":dataSubmit["price"],                   //  原价
                    "firstPay" : info["firstTimePay"],                   //  首付
                    "servicePay" : info["monthRate"],                    //  利息
                    "monthPay" : info["calculateMoney"],                 //  月供
                    "count":"1",                                            //  数量
                    "periods" : info["finalMonth"],                      //  分期月数
                    "uName" : res["userName"],                           //  购买人姓名
                    "telphone" : res["inviteCode"],                      //  购买人手机号
                    "address" : res["userAddressList"][0]["address"],    //  收货地址
                    "arg" : dataSubmit["title"],                         //  商品详情名称
                    "prviewImg" : dataSubmit["thumb"]["smallUrl"],       //  预览图片
                    "activity" :activity,                              //  是否参加活动
                    "discount":dataSubmit["activity"] != null ? dataSubmit["activity"]["discount"] : 0       //  活动折扣
                });

                //location.href = "#/order/confirm";
                //location.href = "/order/confirm";
                $location.path("/order/confirm");
            }).error($scope.httpError);
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
                $rootScope.httpError(err);
            });
        }

        $scope.setTapIndex = function (num) {
            $scope.tapIndex = num;
        };

        /**
         * 给某个DOM元素设置属性
         * @param obj
         * @param attrs
         * @private
         */
        function _setAttr(obj, attrs) {
            for (var i in attrs) {
                attrs[i] && (obj.removeAttribute(i));
                attrs[i] && (obj.setAttribute(i, attrs[i]));
            }
        }

        /**
         * 计算利率和应付金额
         * @param firstPay      首付
         * @param price         价格
         * @param month         月数
         * @private
         */
        function _calculateRate(firstPay, price, month) {
            var curRate = parseFloat($scope.rateInfo[month]) / 10000,
                realPay = price / 100 - firstPay;
            return {
                "monthPay": ((realPay * curRate * month + realPay) / month).toFixed(2),       //  每月付款
                "monthRate": ((realPay * curRate * month) / month ).toFixed(2)               //  手续费
            };
        }

    }

    detailCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout', '$rootScope'];
    return detailCtrl;
});