/**
 * Created by slashhuang on 15/8/19.
 */

require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "util":"/js/lib/common_util",
        "model":"../sales",
        "jquery":"./jquery",
        "swiper":"./swiper",
        "reg_login":"../reg_login",
        "sweetalert": "./sweetalert.min"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        },
        "sweetalert": {
            exports : "sweet"
        }
    }
});

define(["util/ajax_check","util/data_check","../../../bower_components/zepto/zepto","sweetalert"], function (AJAX,dataCheck,$,sweet) {
    var settingFilter = $("#settingFilter");
    var logoutButton = $("#logoutButton");
    logoutButton.on({
        "tap":function(){
            settingFilter.animate({"display":"block"},100)
        }
    });
    settingFilter.on({
        "tap":function(ele){
            var logoutCalback = {
                requestType:"GET",
                success : function(err,status,xhr){
                    sweet({
                        title: "登出成功!",
                        text: "橘花欢迎您的光临!",
                        type:  "success"
                    },function(status){
                        if(status) window.location.hash="/";
                    });
                },
                fail : function(xhr,status,error){
                    sweet({
                        title: "登出失败!",
                        text: "发生未知错误!",
                        type:  "error"
                    });
                }
            };
            var target = ele.target||ele.srcElement;
            switch(target.className){
                case "cancel":
                    settingFilter.animate({
                        "display":"none",
                    },100);
                    break;
                case "":
                    settingFilter.animate({
                        "display":"none",
                    },100);
                    break;
                case "identified":
                    AJAX.logout("",logoutCalback)
            }

        }
    })
});