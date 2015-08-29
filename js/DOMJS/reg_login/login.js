/**
 * Created by slashhuang on 15/8/17.
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
define(['../../../bower_components/zepto/zepto',"util/ajax_check","sweetalert"],function($,ajax,sweet){
    var loginButton = $("#loginSubmit");//登录按钮
    var loginPhoneNumber = $("#loginPhoneNumber");//获取手机号码
    var loginPassword = $("#loginPassword");//获取密码
    var inputStatus = {
        phoneNum : false,
        passWord : false,
    };
    var loginData = {
        phoneNum : undefined,
        passWord : undefined,
    };
    loginButton.on({
        "tap":function(){
            alert("tapped")
            var callback = {
                success : function(err,status,xhr){
                    sweet({
                        title: "登录成功!",
                        text: "请尽情在橘花分期购买吧!",
                        type:  "success"
                    },function(status){
                        if(status) window.history.go(-1);
                    });
                },
                fail : function(xhr,status,error){
                    sweet({
                        title: "登录失败!",
                        text: "用户名或密码错误!",
                        type:  "error"
                    });
                }
            };
            loginData.phoneNum = loginPhoneNumber.val();
            loginData.passWord = loginPassword.val();
            ajax.userLogin(loginData,callback)
        }
    })


});