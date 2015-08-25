define(["/js/lib/jweixin-1.0.0.js", "/js/lib/jquery.js"], function (wx, $) {
    //定义确定购买orderConfirm
    function orderConfirmCtrl($scope, $routeParams, $location, $http) {
        //初始化变量完成

        var orderId = $location.search()["orderId"],
        //  从url里面获取orderId
            tmpData = {};

        $.ajaxSetup({
            contentType : 'application/json'
        });

        $http({
            "method": "get",
            "url": prefuri + "/order/" + orderId
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
            $.ajax({
                url: prefuri + "/pay/create/",
                dataType: "json",
                type: "post",
                data: '{"orderId": "2015082017361235", "amount": 1, "payCode": "PAY_WEIXIN", "tradeType": "TRADE_CONSUME", "description": "消费"}',
                success: function(res){
                    wx.config({
                        "debug": true,
                        "appId": res["appId"],
                        "timestamp": res["timeStamp"],
                        "nonceStr": res["nonceStr"],
                        "signature": res["signature"],
                        "jsApiList": ["chooseWXPay"]
                    });
                    wx.chooseWXPay({
                        "timestamp": res["timestamp"],
                        "nonceStr": res["nonceStr"],
                        "package": res["wxPackage"],
                        "signType": res["signType"],
                        "paySign": res["paySign"],
                        success: function (res) {
                            alert("支付成功!");
                            $http({
                                "method": "post",
                                "url": prefuri + "/pay/pay/",
                                "params":{
                                    "":res["paymentId"]
                                }
                            });
                        },
                        fail:function(err){
                            var info = "";
                            for(var i in err){
                                info += i + "---" + err[i] + "\n";
                            }
                            alert(info);
                            alert("发送错误！请重试！");
                        },
                        cancel:function(){
                            alert("您取消了本次支付！");
                        }
                    });
                }
            })
        };

        /**
         * 转换商品价格为两位数字
         * @param price
         * @return {string}
         */
        $scope.transferPrice = function (price) {
            return (price / 100).toFixed(2);
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
                "address": data["addressId"],                                    //  配送地址
                "orderId": data["orderId"],                                      //  订单编号
                "productName": data["orderLines"][0]["commodityName"],           //  商品名称
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
    orderConfirmCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return orderConfirmCtrl;
});
