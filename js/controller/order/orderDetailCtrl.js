/**
 * 订单详情控制器
 * build by rwson @2015-08-23
 */
define([], function () {
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

        $http({
            "method": "get",
            "url": $rootScope.prefuri + "/order/" + orderId
        }).success(function (res) {
            $scope.data = _rendData(res);
        }).error(function () {
            $scope.data = {};
        });

        /**
         * 重新购买
         * @param id
         */
        $scope.reBuy = function (id) {
            location.hash = "/sale/detail/" + id;
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
            var returnObj = {};
            returnObj = {
                "name": data["userName"],                                        //  姓名
                "mobile": data["mobile"],                                        //  手机号
                "arg": data["orderLines"][0]["commodityName"],                   //  商品参数
                "off": "",                                                       //  优惠信息
                "status": data["totalStatus"]["value"],                          //  订单状态
                "sendTime": "",                                                  //  发货时间
                "address": data["addressId"],                                    //  配送地址
                "payMethod": "微信支付",                                          //  支付方式
                "ticketInfo": "个人",                                             //  发票信息
                "orderId": data["orderId"],                                      //  订单编号
                "productName": data["orderLines"][0]["commodityName"],           //  商品名称
                "saleUnit": data["orderLines"][0]["saleUnit"],                   //  购买单价
                "saleVolume": data["orderLines"][0]["saleVolume"],               //  购买个数
                "salePrice": data["orderLines"][0]["salePrice"],                 //  商品原价
                "realPayAmount": data["orderLines"][0]["realPayAmount"],         //  实际付款
                "payAmount": data["payAmount"],                                  //  销售总额
                "prePeriodsPay": data["orderLines"][0]["prePeriodsPay"],         //  每期付款
                "periods": data["orderLines"][0]["periods"],                     //  分期期数
                "firstPay": data["orderLines"][0]["firstPay"],                   //  首付
                "productId": data["orderLines"][0]["sku"]["productId"]           //  商品id
            };
            return returnObj;
        }
    };

    orderDetailCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return orderDetailCtrl;
});