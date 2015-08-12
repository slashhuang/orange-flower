/**
 * Created by slashhuang on 2015/7/28.
 */
define(["zepto"], function($) {
        (function(){
            var $item_slider_bar = $("#itemSliderNav").children();
            var $item_slider_content = $(".item-slider-wrapper").eq(0);
            var ele_slide = function (ele) {
                var item_slider_func = function (index, eleWidth) {
                    var movedist = -eleWidth * index;
                    $item_slider_content.animate({left: movedist}, 0)
                };
                var ele_width=function(ele){
                    return parseInt(ele.eq(0).css("width"));
                }
                ele.on({
                    "tap": function () {
                        var index = $(this).index();
                        var eleWidth = ele_width($item_slider_content.children())
                        item_slider_func(index, eleWidth);
                    },
                    "swipeLeft": function () {
                        var index = $(this).index();
                        switch (index) {
                            case 0:
                                index = 1;
                                break;
                            case 1:
                                index = 2;
                                break;
                            case 2:
                                index = 0;
                                break;
                        }
                        var eleWidth = ele_width($item_slider_content.children())
                        item_slider_func(index, eleWidth);
                    },
                    "swipeRight": function () {
                        var index = $(this).index();
                        switch (index) {
                            case 0:
                                index = 0;
                                break;
                            case 1:
                                index = 2;
                                break;
                            case 2:
                                index = 1;
                                break;
                        }
                        var eleWidth = ele_width($item_slider_content.children())
                        item_slider_func(index, eleWidth);
                    }
                });
            }
            ele_slide($item_slider_bar);
            //ele_slide($item_slider_content)

        })()
    }
);
