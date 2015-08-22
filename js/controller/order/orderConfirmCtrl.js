define(["/js/lib/jweixin-1.0.0.js"], function (wx) {
    //定义确定购买orderConfirm
    function orderConfirmCtrl($scope, $routeParams, $location, $http) {
        //初始化变量完成

        var orderId = $location.search()["orderId"],
        //  从url里面获取orderId

            httpProfix = "http://juhua-server.orange.com";
        //  请求前缀

        $http({
            "method": "get",
            "url": httpProfix + "/order/" + orderId
        }).success(function (res) {
            $scope.data = res;
            console.log(res);
        }).error(function () {
            $scope.data = {};
        });

        /**
         * 提交订单
         * @param id
         */
        $scope.confirmBuy = function (id) {
        };
    };
    orderConfirmCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return orderConfirmCtrl;
});


var data = {
    "id": 1,
    "orderId": "2015082017361234",
    "orderType": {"title": "正向", "value": "FORWARD"},
    "userId": 1,
    "userName": "孙昊",
    "sellerId": null,
    "sellerName": null,
    "saleAmount": 110,
    "payAmount": 100,
    "realPayAmount": 100,
    "mobile": "18014480006",
    "addressId": 2,
    "orderTime": 144011522343265,
    "payStatus": {"title": "未支付", "value": "PAY_NO"},
    "totalStatus": {"title": "待支付", "value": "TO_PAY"},
    "deleteFlag": {"title": "未删除", "value": "DELETE_NO"},
    "orderLines": [{
        "id": 1,
        "orderId": "2015082017361234",
        "orderType": {"title": "正向", "value": "FORWARD"},
        "userId": 1,
        "userName": "孙昊",
        "sellerId": 0,
        "sellerName": "0",
        "skuId": 1,
        "commodityName": "Apple iPhone 6 (A1586)",
        "commodityIcon": "0",
        "commodityType": 0,
        "salePrice": 500000,
        "saleVolume": 1,
        "saleUnit": "个",
        "saleAmount": 500000,
        "payAmount": 100000,
        "realPayAmount": 100000,
        "periods": 10,
        "firstPay": 100000,
        "prePeriodsPay": 40000,
        "evaluation": false,
        "evaluationTime": 0,
        "cancleReason": "0",
        "appType": {"title": "微信客户端", "value": "WEIXIN"},
        "clientRemark": "测试",
        "orderTime": 144011522343265,
        "payTime": 144011522343265,
        "finishTime": 0,
        "deleteFlag": {"title": "未删除", "value": "DELETE_NO"},
        "sku": {
            "createAt": 0,
            "createBy": 0,
            "modifiedAt": 0,
            "modifiedBy": 0,
            "id": 1,
            "no": "12345",
            "title": "Apple iPhone 6 (A1586) 金色 16GB ",
            "productId": 1,
            "key": "1-3",
            "price": 478800,
            "purchasePrice": 408800,
            "total": 50,
            "sold": 0,
            "weight": 0,
            "picIds": null,
            "pics": null,
            "attrItemIds": [1, 3],
            "product": {
                "createAt": 0,
                "createBy": 0,
                "modifiedAt": 0,
                "modifiedBy": 0,
                "id": 1,
                "title": "Apple iPhone 6 (A1586)",
                "body": "尺寸更大，却愈加纤薄。堪称 iPhone 新一代至为出众的大作。",
                "brandId": 1,
                "thumbId": 1,
                "picIds": [1, 2, 3, 4, 5],
                "detail": "屏幕尺寸：4.7英寸\r\n分辨率：1334 x 750\r\n后置摄像头：800万像素\r\n前置摄像头：120万像素\r\n4G：移动(TD-LTE)/联通(FDD-LTE)/电信(FDD-LTE)\r\n3G：移动(TD-SCDMA)/联通(WCDMA)/电信(CDMA2000)\r\n2G：移动/联通(GSM)/电信(CDMA)\r\n商品名称：苹果iPhone 6商品编号：1217508品牌： 苹果（APPLE）上架时间：2014-10-09 21:50:10商品毛重：400.00g商品产地：中国大陆系统：苹果（IOS）机身颜色：金色",
                "specs": "品牌\t苹果（Apple）\r\n型号\tiPhone 6 A1586\r\n颜色\t金色\r\n上市年份\t2014年\r\n上市月份\t9月\r\n输入方式\t触控\r\n智能机\t是\r\n操作系统\t苹果（IOS）\r\n操作系统版本\tIOS\r\nCPU品牌\t苹果\r\nCPU说明\t配备 64 位架构的 A8 芯片,M8 运动协处理器",
                "inventory": "iPhone 6*1;具有线控功能和麦克风的 Apple EarPods*1；Lightning to USB 连接线*1；Micro USB 转 Lightning接头；USB 电源适配器*1；保修卡*1；资料",
                "tagIds": [10, 11],
                "catIds": [2],
                "formId": 0,
                "installmentId": 1,
                "status": {"title": "启用", "value": "ENABLED"},
                "installment": {
                    "createAt": 0,
                    "createBy": 0,
                    "modifiedAt": 0,
                    "modifiedBy": 0,
                    "id": 1,
                    "title": "期数：1-12月，首付10%-50%",
                    "minMonth": 1,
                    "maxMonth": 12,
                    "minPay": 10,
                    "maxPay": 50,
                    "status": {"title": "启用", "value": "ENABLED"}
                },
                "brand": {
                    "createAt": 0,
                    "createBy": 0,
                    "modifiedAt": 0,
                    "modifiedBy": 0,
                    "id": 1,
                    "catIds": null,
                    "title": "苹果",
                    "titleEn": "apple",
                    "body": "apple bigger than bigger a pple",
                    "logo": 0,
                    "status": {"title": "启用", "value": "ENABLED"}
                },
                "pics": null,
                "thumb": null,
                "tags": null
            }
        }
    }],
    "buyer": null,
    "identityAuth": null,
    "orderAudit": null
};