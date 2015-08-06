/**
 * Created by slashhuang on 2015/7/28.
 */
define(["zepto"], function($) {
        var buy_btn = $("#buy_installment");
        var buy_frame =  $(".item-frame-background");
        var buy_form = $(".item-bid-order");
        var close_btn = $("#layer-close");
        var init_item_detail_style= function() {
            buy_frame.css({"opacity":"0","zIndex":"-100"});
            buy_form.css({"bottom": "-100rem"});
        };
        init_item_detail_style();
        buy_btn.tap(function(){
            $(this).text("立即购买");
            buy_frame.css({"opacity":"0.5","zIndex":"100"});
            buy_form.css({"bottom": "5.54rem"});
        });
        buy_frame.tap(function(){
            buy_btn.text("分期购买");
            init_item_detail_style()
        });
        close_btn.tap(function(){
            buy_btn.text("分期购买");
            init_item_detail_style()
        });
        console.log(close_btn)
    }
);
