/**
 * Created by yuji on 15/7/27.
 */

require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
         "util":"/js/lib/common_util",
        "model":"../js_models",
        "jquery":"./jquery",
        "swiper":"./swiper"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
    }
});

require(['util/swiper_','zepto'],function(swiper, $){
    swiper.picture();
    swiper.div();
});