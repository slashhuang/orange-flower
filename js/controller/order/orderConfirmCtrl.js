define(["/js/lib/jweixin-1.0.0.js", "/js/lib/jquery.js", "pingpp"], function (wx, $, pay) {

    //定义确定购买orderConfirm
    function orderConfirmCtrl($scope, $routeParams, $location, $http,$rootScope) {
        //初始化变量完成
        var orderId = $location.search()["orderId"],
        //  从url里面获取orderId
            tmpData = {},
            storageParams = JSON.parse(localStorage.getItem("orderInfo"));

        if(storageParams["showBtn"]){
            $scope.data = _rendData(storageParams);
            $scope.showBtn = storageParams["showBtn"] == "true" ? true : false;
        }else{
            $http({
                "method": "get",
                "url": $rootScope.prefuri + "/order/" + orderId
            }).success(function (res) {
                $scope.data = _rendData(res,"list");
                tmpData = res;
            }).error(function (err) {
                $scope.data = {};
                $rootScope.httpError(err);
            });
        }

        /**
         * 显示按钮的状态值
         * @param id
         * @returns {string}
         */
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
                    if(storageParams["showBtn"] == "true"){
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
         * @param status
         */
        $scope.confirmBuy = function (id, firstPay,status) {
            var submitData = {
                "orderType": "FORWARD",                         //  订单类型
                "orderLineDtos": [
                    {
                        "orderType": "FORWARD",                 //  订单类型
                        "realPayAmount": parseInt($scope.data.realPayAmount),                     //  实付款/退款
                        "skuId": storageParams["skuId"],                 //  商品sku
                        "saleVolume": 1,                     //  销售数量
                        "periods": $scope.data.periods,                           //  分期期数
                        "firstPay": firstPay,                          //  首付金额
                        "clientRemark": "",
                        "actFlag":$scope.data.activity
                    }
                ]
            };
            //  下单相关参数

            if(status=="TO_PAY" || storageParams["showBtn"] == "true"){
                if(firstPay && firstPay > 0){
                    //  首付大于0,先下单后支付
                    $http({
                        "method": "post",
                        "url": $rootScope.prefuri + "/order/create",
                        "data": submitData
                    }).success(function (res) {

                        var data = {
                            //"orderId": id,
                            "orderId": id || res,
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
                                    location.href = "/order/info?uId=" + $scope.data.uId;
                                } else if (result == "fail") {
                                    $scope.debugLog("支付失败",'alert');
                                    location.href = "/order/info?uId=" + $scope.data.uId;
                                } else if (result == "cancel") {
                                    $scope.debugLog("支付失败",'alert');
                                    location.href = "/order/info?uId=" + $scope.data.uId;
                                }
                            });
                        }).error($rootScope.httpError);

                    }).error($rootScope.httpError);
                }else{
                    //  首付是0,直接下单
                    $http({
                        "method": "post",
                        "url": $rootScope.prefuri + "/order/create",
                        "data": submitData
                    }).success(function (res) {
                        location.href = "/order/info?uId=" + $scope.data.uId;
                    }).error($rootScope.httpError);
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
         * 立即付款,去订单确认页面确认
         * @param orderId
         */
        $scope.payNow = function(orderId){
            location.href = "/order/info?uId=" + $scope.data.uId;
        };

        /**
         * 拼接需要的数据
         * @param data
         * @param type
         * @returns {Object}
         * @private
         */
        function _rendData(data,type) {
            var returnObj = {};
            if(type == "list"){
                returnObj = {
                    "name": data["userName"],                                        //  姓名
                    "mobile": data["mobile"],                                        //  手机号
                    "arg": data["orderLines"][0]["commodityName"],                   //  商品参数
                    "address": data["userAddress"]["address"],                       //  配送地址
                    "img":data["orderLines"][0]["commodityIconFile"]["smallUrl"],   //  商品缩略图
                    "orderId": data["orderId"],                                      //  订单编号
                    "productName": data["orderLines"][0]["sku"]["title"],           //  商品名称
                    "saleUnit": data["orderLines"][0]["saleUnit"],                   //  购买单价
                    "saleVolume": data["orderLines"][0]["saleVolume"],               //  购买个数
                    "servicePay":data["orderLines"][0]["serviceCharge"],            //  每期服务费,包含在每期支付里面
                    "salePrice": data["orderLines"][0]["salePrice"],                 //  商品原价
                    "realPayAmount": data["orderLines"][0]["realPayAmount"],         //  实际付款
                    "payAmount": data["payAmount"],                                  //  销售总额
                    "prePeriodsPay": data["orderLines"][0]["prePeriodsPay"],         //  每期付款
                    "periods": data["orderLines"][0]["periods"],                     //  分期期数
                    "firstPay": data["orderLines"][0]["firstPay"],                    //  首付
                    "totalStatus": data["totalStatus"]["value"],                      //    总状态
                    "uId":data["buyer"]["id"]                                         //    用户Id
                };
                //  type为list时,从订单列表进来的
            }else{
                var ammnont = (parseFloat(data["monthPay"] + data["monthPay"]) * data["periods"] + parseFloat(data["firstPay"])) * 100;
                returnObj = {
                    "name": data["uName"],                                             //  姓名
                    "mobile": data["telphone"],                                        //  手机号
                    "arg": data["arg"],                   //  商品参数
                    "address": data["address"],                       //  配送地址
                    "img":data["prviewImg"],   //  商品缩略图
                    "productName": data["arg"],           //  商品名称
                    "saleUnit": "个",                   //  购买单价
                    "saleVolume": data["count"],               //  购买个数
                    "servicePay":data["servicePay"] * 100,            //  每期服务费,包含在每期支付里面
                    "salePrice": data["salePrice"],                 //  商品原价
                    "realPayAmount": ammnont,         //  实际付款
                    "payAmount": ammnont,                                  //  销售总额
                    "prePeriodsPay": data["monthPay"] * 100,         //  每期付款
                    "periods": data["periods"],                     //  分期期数
                    "firstPay": data["firstPay"] * 100,                    //  首付
                    "id":data["skuId"],                     //  skuId
                    "uId":data["uId"],                   //  用户Id
                    "activity":data["activity"]         //  活动
                };
                //  从商品详情页进来的
            }
            return returnObj;
        }
    }
    orderConfirmCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return orderConfirmCtrl;
});
