/**
 * Created by slashhuang on 15/8/17.
 */
/**
 * Created by slashhuang on 15/8/4.
 */
require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "util":"/js/lib/common_util",
        "model":"../js_models",
        "jquery":"./jquery",
        "swiper":"./swiper",
        "reg_login":"../reg_login",
        "sweetalert": "./sweetalert.min"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        },
        "sweetalert": {
            exports : "sweet"
        }
    }
});


define(["zepto","sweetalert","util/url_config"], function($,sweet,config){
    var payBillNOW = $("#payBillNOW");
    //alert(window.screen.height)

    (function(){
        var setMinHeight = window.screen.height + "px";
        document.getElementsByClassName("of-bill-bg")[0].style.height=setMinHeight;
    })()
    payBillNOW.on({
        "tap":function(){
            window.location.href=""
        }
    })
});