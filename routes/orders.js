/**
 * Created by slashhuang on 15/8/16.
 *
 * 订单路由
 */
var express = require('express');
var router = express.Router();

var detailData = {
    "info":{
        "num":"123323255",
        "time":"2015-08-09"
    },
    "detail":{
        "img":"/images/order/iphone.jpg",
        "name":"苹果  (Apple)  iPhone6",
        "price":"白色&nbsp;&nbsp;64GB",
        "salePrice":"4198",
        "originalPrice":"4998"
    },
    "order":{
        "firstPay":"0",
        "monthPay":"186.53×24",
        "offPay":{
            "fisrtPayOff":"首付20%",
            "other":"再减200"
        },
        "state":2,
        "deliveryTime":"2015-08-10",
        "recivePersion":"罗智淳",
        "address":"江苏省南京市新街口  建华大厦",
        "receiptInfo":"个人"
    },
    "reBuyLink":"/"
};
//  模拟订单详情

router.get('/detail', function(req, res, next){
    res.render('order/order_detail', {
        "title":"订单详情",
        "data":detailData
    });
});
//  订单列表路由

router.get("/list",function(req,res,next){
    res.render('order/order_list',{
        "title":"订单详情"
    });
});
//  订单详情路由

module.exports = router;
