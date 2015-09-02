define(["/js/lib/jweixin-1.0.0.js", "/js/lib/jquery.js", "debug", "pingpp"], function (wx, $, debug, pay) {

    //定义确定购买orderConfirm
    function orderConfirmCtrl($scope, $routeParams, $location, $http,$rootScope) {
        //初始化变量完成
        var orderId = $location.search()["orderId"],
        //  从url里面获取orderId
            tmpData = {};


        $.ajaxSetup({
            contentType: 'application/json'
        });

        $http({
            "method": "get",
            "url": $rootScope.prefuri + "/order/" + orderId
        }).success(function (res) {
            $scope.data = _rendData(res);
            tmpData = res;
        }).error(function () {
            $scope.data = {};
        });

        /**
         * 提交订单
         * @param id
         * @param firstPay
         */
        $scope.confirmBuy = function (id, firstPay) {
            if(firstPay && firstPay > 0){
                $.ajax({
                    url: $rootScope.prefuri + "/pay/pay/",
                    dataType: "json",
                    type: "post",
                    data: '{"orderId": "' + id + '", "amount": 1, "payChannel": "WX_PUB", "tradeType": "TRADE_CONSUME", "description": "消费"}',
                    success: function (res) {
                        pay.createPayment(res, function (result, error) {
                            if (result == "success") {
                                debug.success("success");
                            } else if (result == "fail") {
                                var info = "";
                                for (var i in error) {
                                    info += i + "---" + error[i] + "\n";
                                }
                                debug.error(info);
                                debug.error("发送错误！请重试！");
                            } else if (result == "cancel") {
                                debug.log("您取消了本次支付！");
                            }
                        });
                    }
                })
            }else{
                location.href = "/order/info?orderId=" + id;
            }
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
                "id":data["id"],                                                //  商品单价
                "mobile": data["mobile"],                                        //  手机号
                "arg": data["orderLines"][0]["commodityName"],                   //  商品参数
                "address": data["addressId"],                                    //  配送地址
                "orderId": data["orderId"],                                      //  订单编号
                "productName": data["orderLines"][0]["sku"]["title"],           //  商品名称
                "saleUnit": data["orderLines"][0]["saleUnit"],                   //  购买单价
                "saleVolume": data["orderLines"][0]["saleVolume"],               //  购买个数
                "service": "2000",                                               //  服务费
                "salePrice": data["orderLines"][0]["salePrice"],                 //  商品原价
                "realPayAmount": data["orderLines"][0]["realPayAmount"],         //  实际付款
                "payAmount": data["payAmount"],                                  //  销售总额
                "prePeriodsPay": data["orderLines"][0]["prePeriodsPay"],         //  每期付款
                "periods": data["orderLines"][0]["periods"],                     //  分期期数
                "firstPay": data["orderLines"][0]["firstPay"]                    //  首付
            };
            return returnObj;
        }
    };
    orderConfirmCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return orderConfirmCtrl;
});
