/**
 * Created by slash on 15/9/15.
 *
 */

({
    baseUrl: './js',
    name: 'app',

    out:"app.js",
    fileExclusionRegExp: /^(r|build)\.js$|node_modules/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths:{
        "angular":"lib/angular",
        "zepto":"lib/zepto.min",
        "util":"lib/common_util",
        "jquery":"lib/jquery",
        "formSubmit":"lib/jquery.form.min",
        "swiper":"lib/swiper",
        "cookie":"lib/cookie",
        "pingpp":"lib/pingpp_pay",
        "weixinPay":"lib/jweixin-1.0.0",
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
        },
        "jquery":{
            "exports":"jquery"
        },
        "formSubmit":{
            "exports":"formSubmit"
        },
        "weixinPay":{
            "exports":"weixinPay"
        }
    }
})