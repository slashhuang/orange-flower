/**
 * Created by slashhuang on 15/8/4.
 */
/**
 * Created by yuji on 15/7/27.
 */
require.config({
    baseUrl:"../public/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "reg_login":"../reg_login",
        "jquery":"./jquery"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },

    }
})

require(["url_config","ajax_check","jquery","distpicker.data","distpicker"], function (config,check,$,disData,distpicker) {
    $('#regForm').distpicker({
        province: '---- 所在省 ----',
        city: '---- 所在市 ----'
    });
});