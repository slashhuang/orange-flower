define(["/js/lib/jweixin-1.0.0.js", "/js/lib/jquery.js", "pingpp"], function (wx, $, pay) {

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



        $scope.confirmState =function(id){
            var state= "";
            $scope.showBtn = true;
            switch(id){
                case "TO_PAY":
                    state = "立即支付";
                    break;
                case "RECEIPTED":
                    state = "确认收货";
                    break;
                case "":
                    state = "提交订单";
                    break;
                default :{
                    $scope.showBtn = false;
                    if($location.search()["showBtn"] == "true"){
                        state = "提交订单";
                        $scope.showBtn = true;
                    }
                }
            }
            return state;
        };

        /**
         * 提交订单
         * @param id
         * @param firstPay
         */
        $scope.confirmBuy = function (id, firstPay,status) {

            if(status=="TO_PAY" || $location.search()["showBtn"] == "true"){
                if(firstPay && firstPay > 0){
                    var data = {
                        "orderId": id,
                        "payChannel": "WX_PUB",
                        "tradeType": "TRADE_CONSUME"
                    };

                    $http({
                        "method": "post",
                        url: $rootScope.prefuri + "/pay/pay/",
                        "data": data
                    }).success(function (res) {
                        pay.createPayment(res, function (result, error) {
                            if (result == "success") {
                                //location.href="/order/list";
                                location.href = "/order/info?orderId=" + id;
                            } else if (result == "fail") {
                                $scope.debugLog("支付失败",'alert');
                            } else if (result == "cancel") {
                                $scope.debugLog("支付失败",'alert');
                            }
                        });
                    }).error($rootScope.httpError);
                }else{
                    location.href = "/order/info?orderId=" + id;
                }
            }
            else if(status=="RECEIPTED"){
                $http({
                    "method": "get",
                    url: $rootScope.prefuri + "/order/confirm/"+id
                }).success(function () {
                    window.history.go(-1);
                }).error($rootScope.httpError);
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
                "address": data["userAddress"]["address"],                                   //  配送地址
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
                "firstPay": data["orderLines"][0]["firstPay"],                    //  首付
                "totalStatus": data["totalStatus"]["value"]
            };
            return returnObj;
        }
    };
    orderConfirmCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return orderConfirmCtrl;
});
