/**
 * Created by yuji on 15/7/27.
 */
require.config({
    baseUrl:"./public/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "swiper":"./swiper",
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"Swiper"
        }
    }
})

require(['swiper_','zepto','lazyload'],function(swiper, $){
    swiper.picture();
    swiper.div();

    //$(".lazy").lazyload({
    //    effect: "fadeIn",
    //    vertical_only: true
    //});
});