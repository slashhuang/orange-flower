/**
 * Created by slashhuang on 15/8/17.
 */
/**
 * Created by slashhuang on 15/8/4.
 */

define(["zepto","util/url_config"], function($,config){
    var payBillNOW = $("#payBillNOW");
    var billMonthFilter = $("#billMonthFilter");//账单月份遮罩层
    (function(){
        var setFilterHeight =$("#billHeaderHeight").offset().height;
        billMonthFilter.css({
            "position":"absolute",
            "z-index":"1000",
            "top":setFilterHeight
        });
    })();

    //设置最小高度
    (function(){
        var setMinHeight = window.screen.height + "px";
        document.getElementsByClassName("of-bill-bg")[0].style.minHeight=setMinHeight;
    })();
    //付款按钮
    payBillNOW.on({
        "tap":function(){
            window.location.href=""
        }
    });
    //点击月份显示数据
    var monthSelector = $(".of-bill-month-list-box").find("li");
    var billHeaderHeight = $("#billHeaderHeight");
    var monthBillTAP = $("#billMonth");//点击账单月份头部
    monthSelector.on({
        "tap":function(e){
            var target = e.target|| e.srcElement;
            if(target.tagName="i"){
              monthSelector.find("i").removeClass("active");
              target.classList.add("active");
                slider()
            }
        }
    });
    var status = 0;
    var slider = function(){
        var settings={
            "height":"0",
            "overflow":"hidden"
        };
        console.log(billMonthFilter);
        switch(status){
            case 0:
                billMonthFilter.animate(settings,100);
                status =1;
                break;
            case 1:{
                billMonthFilter.animate({"height":"","overflow":""},100);
                status =0;
                break;
            }
        }
    };
    monthBillTAP.on({
        "tap": slider
    })
});