/**
 * Created by slashhuang on 2015/7/28.
 */
define(["zepto"], function($) {
        //全局变量
        var window_height=window.screen.height;
        var $item_slider_content = $(".item-slider-wrapper").eq(0);
        var $item_slider_window = $(".item-slider-window").eq(0);
        var $item_slider_bar = $("#itemSliderNav").children();
        //页面基本设置以及选项卡悬浮效果
        (function(){
            //确保选项卡高度足够
            var top_dist = document.getElementById("itemSliderNav").offsetTop;
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
            $item_slider_content.css("min-height",window_height);
            $item_slider_window.css("min-height",content_height);
            var content_height = $item_slider_content.offset().height;
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
        //商品外形选项
        (function () {
            var $itemChoice =$(".item-detail-option-list");
            $itemChoice.tap(function(event){
               var target = event.target||event.srcElement;
                if(target.tagName == "DD"){
                    $(target).parent().find("dd").css("border-color","#e9e9e9").find("i").removeClass("active");
                    $(target).css("border-color","#16cd9b").find("i").addClass("active");
                }
            })
        })();
        //商品购买跳出iframe页面
        (function(){
            var $buyNow = $("#itemSaleButton");
            $buyNow.tap(function(){
                $(this).html("立即购买");
                $("#itemBuyIframe").css({
                    "display":"block",
                    "background-color":"rgba(91, 91, 91, 0.91)"
                });
                $("#itemMainFrame").css({
                    "display":"block",
                    "position":"fixed",
                    "bottom":"50px"
                })
            })
        })();
    });
