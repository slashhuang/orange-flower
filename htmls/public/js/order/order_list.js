/**
 * 订单列表
 * build by rwson on 2015-08-15
 */

require.config({
    "baseUrl":"../public/js/lib",
    "paths":{
        "zepto":"./zepto.min"
    },
    "shim":{
        "zepto":{
            "exports":"$"
        }
    }
});

define(["zepto"],function($){

    var reBackBtn = $(".reback-btn"),               //  退换货品按钮
        cancelBtn = $(".cancel-btn"),               //  取消订单按钮
        confirmOrder = $(".confirm-btn"),           //  确认订单按钮
        confirmBuy = $(".confirm-buy-btn"),         //  确认购买按钮
        deleteBtn = $(".delete-btn");               //  删除订单按钮

    /**
     * 退换货品事件
     */
    reBackBtn.on("tap",function(){
        _reBack(this);
    });

    /**
     * 退换货品
     * @param obj 当前事件对象
     * @private
     */
    function _reBack(obj){
        var curObj = $(obj);
    }

    /**
     * 取消订单事件
     */
    cancelBtn.on("tap",function(){
        _cancel(this);
    });

    /**
     * 取消订单
     * @param obj 当前事件对象
     * @private
     */
    function _cancel(obj){
        var curObj = $(obj);
    }

    /**
     * 确认订单事件
     */
    confirmOrder.on("tap",function(){
        _confirmOrder(this);
    });

    /**
     * 确认订单
     * @param obj 当前事件对象
     * @private
     */
    function _confirmOrder(obj){
        var curObj = $(obj);
    }

    /**
     * 确认购买事件
     */
    confirmBuy.on("tap",function(){
        _confirmBuy(this);
    });

    /**
     * 确认购买
     * @param obj 当前事件对象
     * @private
     */
    function _confirmBuy(obj){
        var curObj = $(obj);
    }

    /**
     * 删除订单事件
     */
    deleteBtn.on("tap",function(){
        _deleteOrder(this);
    });

    /**
     * 删除订单
     * @param obj 当前事件对象
     * @private
     */
    function _deleteOrder(obj){
        var curObj = $(obj),
            id = curObj.attr("data-delete");
        $("#" + id).remove();
    }

});