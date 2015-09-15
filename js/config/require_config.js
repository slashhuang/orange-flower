/**
 * Created by slashhuang on 15/8/21.
 */
require.config({
    baseUrl:"js",
    paths:{
       "angular":"lib/angular",
        "zepto":"lib/zepto.min",
        "util":"lib/common_util",
        "jquery":"lib/jquery",
        "formSubmit":"lib/jquery.form.min",
        "swiper":"lib/swiper",
        "cookie":"lib/cookie",
        "pingpp":"lib/pingpp_pay",
        "iscroll":"lib/iscroll"
    },
    shim:{
        "angular":{
            "exports":"angular"
        },
        "lib/angular-route": {
            deps: ["angular"]
        },
        "lib/angular-cookies":{
            deps:['angular']
        },
        "zepto":{
            "exports":"$"
        },
        'iscroll':{
            exports: 'iscroll'
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "pingpp":{
            "exports": "pingpp"
        }
    }
});