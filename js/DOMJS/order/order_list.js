/**
 * 订单列表
 * build by rwson on 2015-08-15
 */

require.config({
    "baseUrl": "/js/lib",
    "paths": {
        "zepto": "./zepto.min"
    },
    "shim": {
        "zepto": {
            "exports": "$"
        },
        "sweetalert": {
            "exports": "swAlert"
        }
    }
});

define(["../../../htmls/public/js/lib/zepto.min", "sweetalert"], function ($, swAlert) {

    var reBackBtn = $(".reback-btn"),               //  退换货品按钮
        cancelBtn = $(".cancel-btn"),               //  取消订单按钮
        confirmOrder = $(".confirm-btn"),           //  确认订单按钮
        confirmBuy = $(".confirm-buy-btn"),         //  确认付款按钮
        deleteBtn = $(".delete-btn");               //  删除订单按钮

    /**
     * 退换货品事件
     */
    reBackBtn.on("tap", function () {
        _reBack(this);
    });

    /**
     * 退换货品
     * @param obj 当前事件对象
     * @private
     */
    function _reBack(obj) {
        var curObj = $(obj);
    }

    /**
     * 取消订单事件
     */
    cancelBtn.on("tap", function () {
        _cancel(this);
    });

    /**
     * 取消订单
     * @param obj 当前事件对象
     * @private
     */
    function _cancel(obj) {
        var curObj = $(obj),
            id = curObj.attr("data-num");
        //  读取到当前点击对象和它对应的订单ID

        swAlert({
            title: "确认操作",
            text: "你真的要取消本订单吗?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                //  点击确认按钮回调

                swAlert("", "取消订单成功!", "success");
                $("#" + id).remove();
            } else {
                //  点击取消按钮回调

                swAlert("取消", "你取消了本操作!", "error");
            }
        });
        //  弹出确认信息
    }

    /**
     * 确认订单事件
     */
    confirmOrder.on("tap", function () {
        _confirmOrder(this);
    });

    /**
     * 确认订单
     * @param obj 当前事件对象
     * @private
     */
    function _confirmOrder(obj) {
        var curObj = $(obj);
    }

    /**
     * 确认付款事件
     */
    confirmBuy.on("tap", function () {
        _confirmBuy(this);
    });

    /**
     * 确认付款
     * @param obj 当前事件对象
     * @private
     */
    function _confirmBuy(obj) {
        var curObj = $(obj);
    }

    /**
     * 删除订单事件
     */
    deleteBtn.on("tap", function () {
        _deleteOrder(this);
    });

    /**
     * 删除订单
     * @param obj 当前事件对象
     * @private
     */
    function _deleteOrder(obj) {
        var curObj = $(obj),
            id = curObj.attr("data-num");
        //  获取到当前对象和它对应的订单ID

        swAlert({
            title: "确认操作",
            text: "你真的要删除本条订单记录吗?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                //  点击确认按钮回调

                swAlert("删除", "订单记录删除成功!", "success");
                $("#" + id).remove();
            } else {
                //  点击取消按钮回调

                swAlert("取消", "你取消了本操作!", "error");
            }
        });
        //  弹出确认信息
    }

});