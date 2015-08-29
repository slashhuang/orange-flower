require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
         "util":"/js/lib/common_util",
        "model":"../sales",
        "jquery":"./jquery",
        "swiper":"./swiper",
        "angular":"./angular.min",
        "angularRoute":"./angular-route"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "angular": {
            "exports": "angular"
        },
        "angularRoute": {
            "exports": "angularRoute"
        },
    }
});


define(['util/swiper_','zepto'],function(swiper, $){
    swiper.picture();
    swiper.div();
});