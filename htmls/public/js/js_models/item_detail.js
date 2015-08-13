/**
 * Created by slashhuang on 2015/7/28.
 */
define(["zepto"], function($) {
        //全局变量
        var window_height=window.screen.height;
        var $item_slider_content = $(".item-slider-wrapper").eq(0);
        var $item_slider_window = $(".item-slider-window").eq(0);
        var $item_slider_bar = $("#itemSliderNav").children();
        var $itemChoice =$(".item-detail-option-list");//选项卡
        var $iframeChoice=$(".of-item-buy-installation");//iframe选项卡
        //页面基本设置以及选项卡悬浮效果
        (function(){

            var top_dist = document.getElementById("itemSliderNav").offsetTop;
            var content_height = $item_slider_content.offset().height;
            $(window).scroll(function() {
                var scrollListener = function (ele) {
                    if ($(window).scrollTop() > top_dist) {
                    $(ele).css({
                        "position": "fixed",
                        "top": "0",
                        "left": "0",
                        "z-index":"999"
                    }).addClass("slider-active-fix-style");
                }
                    else{
                      $(ele).css({
                            "position": "",
                            "top": "",
                            "left": "",
                            "z-index":""
                        }).removeClass("slider-active-fix-style");
                    }
            }
                scrollListener("#itemSliderNav")});
                //确保选项卡高度足够
            $item_slider_content.css("min-height",window_height);
            $item_slider_window.css("min-height",content_height);

        })();
        //商品选项卡
        (function(){
            var ele_show_animation= function (index) {
            //现在先不用滑动效果
                $item_slider_content.children().each(function(){
                    var ele_index = $(this).index();
                    var that = $(this);
                    switch (ele_index){
                        case index:
                            that.show();
                            break;
                        default:that.hide();
                    }
                });
            };
            var ele_bar_tap= function (ele) {
                ele.on({
                    "tap": function () {
                        var index = $(this).index();
                        $(this).parent().children().css("color","#bdbdbd");
                        $(this).css("color","#000");
                        ele_show_animation(index);
                        var canvasWrapper = document.getElementById("itemCanvasWrapper");
                        var canvasEffect = 33.3*index;
                        $(canvasWrapper).animate({left:canvasEffect+"%"},300)
                    }
                });
            };
            ele_bar_tap($item_slider_bar);
        })();
        //商品外形选项函数
        var choiceTapper = function(ele){
            ele.tap(function(event) {
                var target = event.target || event.srcElement;
                if (target.tagName == "DD" || target.tagName == "LI") {
                    console.log(target.tagName);
                    $(target).parent().find(target.tagName).css("border-color", "#e9e9e9").find("i").removeClass("active");
                    $(target).css("border-color", "#16cd9b").find("i").addClass("active");
                }

            });
        };
        choiceTapper($itemChoice);
        choiceTapper($iframeChoice);
        //商品购买跳出iframe页面
        (function(){
            var $buytap = $("#itemSaleButton");//分期购买按钮
            var $buyNow = $("#itemSaleBuyNow");//立即购买按钮
            var mainFrame = $("#itemMainFrame");//主要购买窗口
            var $tapiframe = $("#itemBuyIframe");//遮罩层
            $buytap.tap(function(){
                $(this).hide();
                $buyNow.show();
                mainFrame.css({
                    "display":"block"
                });
                $tapiframe.css({
                    "display":"block",
                    "background-color":"#000"
                });
                $("body").addClass("bg-fixed");

            });
            $tapiframe.tap(function(){
                $(this).hide();
                $buytap.show();
                $buyNow.hide();
                mainFrame.hide();
                $("body").removeClass("bg-fixed");
            })
        })();
    });
