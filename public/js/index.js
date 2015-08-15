/**
 * Created by yuji on 15/7/27.
 */

require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "swiper":"./swiper",
        "jquery":"./jquery"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "handlebars":{
            "deps":["jquery"],
            "exports":"handlebars"
        }
    }
});

require(['swiper_','zepto',"handlebars"],function(swiper, $,handlebars){
    swiper.picture();
    swiper.div();


    //$(".lazy").lazyload({
    //    effect: "fadeIn",
    //    vertical_only: true
    //});
});