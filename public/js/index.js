/**
 * Created by yuji on 15/7/27.
 */
require.config({
    baseUrl:"../public/js/lib",
    paths:{
        "zepto":"http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min",
        "swiper":"http://cdn.bootcss.com/Swiper/3.1.0/js/swiper.jquery.min",
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

    $(".lazy").lazyload({
        effect: "fadeIn",
        vertical_only: true
    });
});