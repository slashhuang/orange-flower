/**
 * 订单列表控制器
 * build by rwson @2015-08-23
 */
define(["pingpp", "jquery"],function(pay, $){
    //定义商品分类orderList
    function orderListCtrl($scope,$routeParams,$location,$http,$rootScope){
        var btnArray = {
            "buyAgain": ['CHECKING', 'CHECKING_FAIL', 'TO_SHIPPED', 'SHIPPED', 'TRADING_SUCCESS', 'TRADING_CLOSED', 'EXCHANGE_CHECK', 'RETURN_CHECK', 'EXCHANGE_FAILED', 'RETURN_FAILED', 'EXCHANGE_SUCCESS', 'RETURN_SUCCESS', 'RETURNING', 'EXCHANGE', 'RETURNED', 'RECEIPTED'],
            "payNow": ['TO_PAY'],
            "confirm": ['RECEIPTED'],
            "cancel": ['CHECKING','TO_PAY','CHECKING_FAIL',"TO_SHIPPED"]
        }


        //初始化变量完成

        var uId = $location.search()["uId"],
        //  从url里面获取uId

            statusArr = ['TO_PAY', 'CHECKING', 'CHECKING_FAIL', 'TO_SHIPPED', 'SHIPPED', 'TRADING_SUCCESS', 'TRADING_CLOSED', 'EXCHANGE_CHECK', 'RETURN_CHECK', 'EXCHANGE_FAILED', 'RETURN_FAILED', 'EXCHANGE_SUCCESS', 'RETURN_SUCCESS', 'RETURNING', 'EXCHANGE', 'RETURNED', 'RECEIPTED'];
        //  状态数组

        $http({
            "method":"get",
            "url":$rootScope.prefuri + "/order/list"
        }).success(function(res){
            $scope.data = _rendData(res["content"]);
        }).error(function(err){
            $rootScope.httpError(err);
            $scope.data = [];
        });
        //  请求数据

        /**
         * 取消订单
         * @param id
         */
        $scope.cancelOrder = function(id){
            var index = _findIndex($scope.data,id,'orderId');
            $http({
                "method":"get",
                "url":$rootScope.prefuri + "/order/cancel/" + id
            }).success(function(res){
                var userCenterUrl = $rootScope.prefuri + "/user/info";
                var XHRrequest = $http({
                    "method": "post",
                    "url": userCenterUrl
                });
                XHRrequest.success(function (data) {
                    if(data){
                        localStorage.centerData = JSON.stringify(data);
                        location.reload();
                    }
                });
                XHRrequest.error($rootScope.httpError);
            }).error(function(err){
                $rootScope.httpError(err);
                $scope.data = [];
            });
        };


        $scope.showButton = function(flag, status){
            var statuses = btnArray[flag];
            return $.inArray(status, statuses) > -1;
        };

        /**
         * 根据不同的按钮渲染按钮
         * @param status
         */
        $scope.showButton1 = function(status){
            var index = _findIndex(statusArr,status);
            console.log(index)
            var result;
            if(index == 0 || index == 1 || index == 2){
                if(index == 1 || index == 2)
                    result = 1;
                else
                    result = 3;
            }else if(index == 4 || index == 16){
                result = 2;
            } else{
                result = 4;
            }

            console.log("result=" + result)
            return result;
        };

        /**
         * 确认收货
         * @param orderId
         * @param status
         */
        $scope.confirmRecive = function(orderId){
            var url = $scope.prefuri + "/order/confirm/" + orderId;
            $http({
                "url":url,
                "method":"get"
            }).success(function(){
                location.reload();
            }).error($rootScope.httpError);
        };

        /**
         * 根据具体的状态值返回相应的class
         * @param status
         */
        $scope.rendClass = function(status){
            var className = "";
            switch (status) {
                case "CHECKING":
                    className = "checking";
                    break;
                case "TO_PAY":
                    className = "no-paid-item";
                    break;
                case  "TRADING_SUCCESS":
                    className = "success-item";
                    break;
                case "TO_SHIPPED":
                    className = "sending";
                    break;
                case "RETURN_CHECK":
                    className = "back-charging";
                    break;
                case "EXCHANGE_FAILED":
                    className = "charging-failed";
                    break;
                case  "TRADING_CLOSED":
                    className = "closed";
                    break;
            }
            return className;
        };

        /**
         * 再次购买
         * @param id
         */
        $scope.reBuy = function(id){
            location.href = "/sale/detail/" + id;
            //$location.path("/sale/detail/" + id);
        };

        /**
         * 显示取消按钮
         * @param statusText
         */
        $scope.showCancel = function(statusText){
            if(statusText == ("待支付" || "审核中")){
                return true;
            }else{
                return false;
            }
        };

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
         * 根据具体的键值(有或没有)返回该元素在数组中的位置
         * @param data
         * @param id
         * @param attr
         * @returns {number}
         * @private
         */
        function _findIndex(data,id,attr){
            var index = -1;
            angular.forEach(data,function(item,key){
                if(attr){
                    if(item[attr] === id){
                        index = key;
                    }
                }else{
                    if(item === id){
                        index = key;
                    }
                }
            });
            return index;
        }

        /**
         * 根据传入的数据渲染相应格式的数据,返回数组
         * @param data
         * @return Array
         * @private
         */
        function _rendData(data){
            var returnVal = [];
            angular.forEach(data,function(item,index){
                if(item && item["orderLines"][0] && item["orderLines"][0]["commodityIconFile"] && item["orderLines"][0]["commodityIconFile"] != null){
                    returnVal.push({
                        "orderId":item["orderId"],                                      //  订单id
                        "img":item["orderLines"][0]["commodityIconFile"]["smallUrl"],   //  商品缩略图
                        "arg":item["orderLines"][0]["sku"]["title"],                    //  商品参数
                        "status":item["totalStatus"]["value"],                          //  订单状态
                        "statusText":item["totalStatus"]["title"],                      //  状态文字说明
                        "salePrice":item["orderLines"][0]["salePrice"],                 //  商品原价
                        "realPayAmount":item["orderLines"][0]["salePrice"],             //  实际付款
                        "prePeriodsPay":item["orderLines"][0]["prePeriodsPay"],         //  每期付款
                        "periods":item["orderLines"][0]["periods"],                     //  分期期数
                        "firstPay":item["orderLines"][0]["firstPay"],                   //  首付
                        "productName":item["orderLines"][0]["commodityName"],           //  商品名称
                        "productId":item["orderLines"][0]["sku"]["id"],                  //  商品id,
                        "preferentialAmount": item["orderLines"][0]["preferentialAmount"], // 商品优惠后的价格
                        "pagePrice": item["orderLines"][0]["pagePrice"],
                        "activity": item["orderLines"][0]["activity"]                 // 订单关联的活动
                    });
                    console.log(item["orderLines"][0]["activity"] != null)
                }
            });
            return returnVal;
        }
    };
    orderListCtrl.$inject=['$scope','$routeParams','$location','$http','$rootScope'];
    return orderListCtrl;
});
