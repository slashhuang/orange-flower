/**
 * Created by slashhuang on 15/8/4.
 */

require.config({
    baseUrl:"./public/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "reg_login":"../reg_login",
        "jquery":"./jquery"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "distpicker":{
            deps: ['jquery',"distpicker.data"],
            //Once loaded, use the global 'distpicker' as the
            //module value.
            exports: 'distpicker'
        }

    }
})

require(["url_config","ajax_check","distpicker"], function (config,check,distpicker) {
    $('#regForm').distpicker({
        province: '---- 所在省 ----',
        city: '---- 所在市 ----'
    });
});