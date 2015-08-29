/**
 * Created by slashhuang on 15/8/21.
 */
require.config({
    baseUrl:"js",
    paths:{
       "angular":"lib/angular",
        "zepto":"lib/zepto.min",
        "util":"lib/common_util",
        "ajaxUrl":"lib/common_util/ajax_check",
        "jquery":"lib/jquery",
        "swiper":"lib/swiper",
        "cookie":"lib/cookie",
        "dom_sales":"DOMJS/sales",
        "dom_order":"DOMJS/order",
        "dom_bill":"DOMJS/bill/bill",
        "dom_main":"DOMJS/dom_main",
        "dom_reglog":"DOMJS/reg_login",
        "debug": "lib/debug",
        "pingpp":"lib/pingpp_pay"
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
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        },
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "debug":{
            "exports": "debug"
        },
        "pingpp":{
            "exports": "pingpp"
        }
    }
});