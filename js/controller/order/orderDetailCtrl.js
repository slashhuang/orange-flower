/**
 * 订单详情控制器
 * build by rwson @2015-08-23
 */
define(["weixinPay", "pingpp"], function (wx, pay) {
    function orderDetailCtrl($scope, $routeParams, $location, $http,$rootScope) {

        var orderId = $location.search()["orderId"],
        //  从url里面获取orderId

            statusArr = [
                {
                    "key": "TO_PAY",
                    "value": "待支付"
                },
                {
                    "key": "CHECKING",
                    "value": "审核中"
                },
                {
                    "key": "TO_SHIPPED",
                    "value": "待发货"
                },
                {
                    "key": "SHIPPED",
                    "value": "已发货"
                },
                {
                    "key": "TRADING_SUCCESS",
                    "value": "交易成功"
                },
                {
                    "key": "TRADING_CLOSED",
                    "value": "交易关闭"
                },
                {
                    "key": "EXCHANGE_CHECK",
                    "value": "换货审核"
                },
                {
                    "key": "RETURN_CHECK",
                    "value": "退货审核"
                },
                {
                    "key": "EXCHANGE_FAILED",
                    "value": "换货审核失败"
                },
                {
                    "key": "RETURN_FAILED",
                    "value": "退货审核失败"
                },
                {
                    "key": "EXCHANGE_SUCCESS",
                    "value": "换货审核成功"
                },
                {
                    "key": "RETURN_SUCCESS",
                    "value": "换货审核失败"
                },
                {
                    "key": "RETURNING",
                    "value": "退货中"
                },
                {
                    "key": "EXCHANGE",
                    "value": "换货中"
                },
                {
                    "key": "RETURNED",
                    "value": "已退货"
                },
                {
                    "key": "RECEIPTED",
                    "value": "已收货"
                }
            ];

        var uId = JSON.parse(localStorage.centerData)["id"];
        var path = "/order/info?uId=" + uId;

        $http({
            "method": "get",
            "url": $rootScope.prefuri + "/order/" + orderId
        }).success(function (res) {
            $scope.data = _rendData(res);
        }).error(function (err) {
            $rootScope.httpError(err);
            $scope.data = {};
        });

        /**
         * 立即支付
         * @param orderId
         */
        $scope.payNow = function(orderId){
            var data = {
                "orderId": orderId,
                "payChannel": "WX_PUB",
                "tradeType": "TRADE_CONSUME"
            };

            $http({
                "method": "post",
                url: $scope.prefuri + "/pay/pay/",
                "data": data
            }).success(function (res) {
                pay.createPayment(res, function (result, error) {
                    if (result == "success") {
                        //$location.path(path);
                        location.href = "/order/list?uId=" + uId;
                    } else if (result == "fail") {
                        $scope.debugLog("支付失败",'alert');
                    } else if (result == "cancel") {
                        $scope.debugLog("用户取消支付",'alert');
                    }
                });
            }).error($rootScope.httpError);
        };

        /**
         * 显示立即支付按钮
         * @param firstPay
         * @param status
         * @returns {boolean}
         */
        $scope.showPayBtn = function(firstPay,status){
            if(firstPay > 0 && status == "TO_PAY"){
                return true;
            }
            return false;
        };

        /**
         * 确认收货
         * @param orderId
         */
        $scope.confirmRecive = function(orderId){
            $http({
                "url":$scope.prefuri + "/confirm/" + orderId,
                "method":"get"
            }).success(function(res){
                //$location.path("/orde/list?uId=" + uId);
                location.href = "/orde/list?uId=" + uId;
            }).error($scope.httpError());
        };

        /**
         * 重新购买
         * @param id
         */
        $scope.reBuy = function (id) {
            //$location.path("/sale/detail/" + id);
            location.href = "/sale/detail/" + id;
        };
        /**
         * 根据两个值是否相同返回class名
         * @param val1
         * @param index
         * @returns {string}
         */
        $scope.setClass = function (val1, index) {
            var count = 0;
            angular.forEach(statusArr,function(item,indexR){
                if(item["key"] == val1){
                    count = indexR;
                }
            });
            if(count >= index){
                return "passed";
            }
            return "";
        };

        /**
         * 根据传入的返回相应的日期格式
         * @param str
         * @returns {string}
         */
        $scope.date = function (str) {
            str = "" + str;
            return str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
        };

        /**
         * 拼接需要的数据
         * @param data
         * @returns {Object}
         * @private
         */
        function _rendData(data) {
            var returnObj = {},
                activity = (!data["orderLines"][0]["activityId"] && data["orderLines"][0]["activityId"] != "0") ? true : false;
            returnObj = {
                "activity":activity,                                             // 活动
                "name": data["userName"],                                        //  姓名
                "mobile": data["mobile"],                                        //  手机号
                "orderTime": data["orderTime"],                                 // 下单时间
                "arg": data["orderLines"][0]["commodityName"],                   //  商品参数
                "off": "",                                                       //  优惠信息
                "status": data["totalStatus"]["value"],                          //  订单状态
                "title": data["totalStatus"]["title"],                           //  订单状态(文本显示)
                "sendTime": data["orderLogistics"] ? data["orderLogistics"]["sendTime"] : "",                  //  发货时间
                "logisticsCompany": data["orderLogistics"] ? data["orderLogistics"]["logisticsCompany"] : "",                  //  物流公司
                "logisticsId": data["orderLogistics"] ? data["orderLogistics"]["logisticsId"] : "",                  //  单号
                "address": data["userAddress"]["address"],                       //  配送地址
                "payMethod": data["payment"] ? data["payment"]["payCode"]["title"] : "",                                          //  支付方式
                "ticketInfo": "个人",                                             //  发票信息
                "orderId": data["orderId"],                                      //  订单编号
                "productName": data["orderLines"][0]["commodityName"],           //  商品名称
                "saleUnit": data["orderLines"][0]["saleUnit"],                   //  购买单位
                "saleVolume": data["orderLines"][0]["saleVolume"],               //  购买个数
                "salePrice": data["orderLines"][0]["salePrice"],                 //  商品原价
                "preferentialAmount": data["orderLines"][0]["preferentialAmount"], // 商品优惠后的价格
                "realPayAmount": data["orderLines"][0]["realPayAmount"],         //  实际付款
                "payAmount": data["payAmount"],                                  //  销售总额
                "prePeriodsPay": data["orderLines"][0]["prePeriodsPay"],         //  每期付款
                "periods": data["orderLines"][0]["periods"],                     //  分期期数
                "firstPay": data["orderLines"][0]["firstPay"],                   //  首付
                "productId": data["orderLines"][0]["sku"]["id"],                  //  商品id
                "activity": data["orderLines"][0]["activity"],                   // 订单关联的活动
                "pagePrice": data["orderLines"][0]["pagePrice"]                               //商品显示的页面价格
            };
            return returnObj;
        }
    };

    orderDetailCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return orderDetailCtrl;
});