/**
 * Created by slashhuang on 15/8/18.
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
define(["../../../bower_components/zepto/zepto","util/data_check","util/ajax_check"],function($,check,AJAX){
    var telephone = $("#telephone");
    var certNum = $("#certNum");
    var certNumTap = $("#certNumTap");
    var checkNextMove = $("#checkNextMove");
    var inputForm = {
        DATA:{
            tele:"",
            code:"",
        },
        STATUS:{
            tele:false,
            code:false,
        }
    };
    telephone.change(function(){
        inputForm.DATA.tele = telephone.val();
        if(check.checkPhoneNumber(telephone.val())){
           inputForm.STATUS.tele = true;
        }
    });
    certNum.change(function(){
        inputForm.DATA.code = certNum.val();
        if(check.checkCertNumber(certNum.val())){
            inputForm.STATUS.tele = true;
        }
    });
    //点击按钮回调
    (function(){
        //显示倒计时
        function showCountdown(timeLeft){
            if(timeLeft > 0){
                certNumTap.addClass("disabled");
                certNumTap.val(timeLeft + "s重试");
                timeLeft--;
                setTimeout(function(){
                    showCountdown(timeLeft);
                },1000);
            }
            else{
                certNumTap.val("获取验证码");
                certNumTap.removeClass("disabled");
                certNumTap.removeAttribute("disabled");
            }
        }
        var callback = {
            success : function(err,status,xhr){
                certNumTap.off("tap",tapResponse);
                showCountdown(10);
            },
            fail : function(xhr,status,error){
                alert("发送失败，请检查手机号");
                certNumTap.off("tap",tapResponse);
                showCountdown(10);
            }
        };
        //主动作AJAX
        var tapResponse =function(){
            AJAX.sendSms(inputForm.DATA.tele,callback);
        };
        certNumTap.on({
            "tap": tapResponse
        })
    })();
    //表单流程
    var userCheckID = $("#userCheckID");//验证用户身份
    var userNewPWD = $("#userNewPWD");//验证新密码；
    //点击下一步
    (function(){
        var checkNextMove = $("#checkNextMove");
        var callback = {
            success : function(err,status,xhr){
                userCheckID.hide();
                userNewPWD.css({
                    "display":"block"
                })
            },
            fail : function(xhr,status,error){
                alert("oops,验证失败");
                userCheckID.hide();
                userNewPWD.css({
                    "display":"block"
                })
            }
        };
        checkNextMove.on({
            "tap":function(){
                if( check.checkIsAllOk(inputForm.DATA)){
                    AJAX.userInfoSubmit(inputForm.DATA,callback);
                }

            }
        });
    })();
    // 重复密码状态
    var newPWD = $("#newPWD");
    var repeatNewPWD = $("#repeatNewPWD");
    var newPWDdoneTAP = $("#newPWDdoneTAP");
    var inputForm = {
        DATA:{
            pwd:"",
            rePWD:"",
        },
        STATUS:{
            pwd:false,
            rePWD:false,
        }
    };
    newPWD.change(function(){
        inputForm.DATA.pwd = newPWD.val();
        if(check.pwdCheck(newPWD.val())){
            inputForm.STATUS.pwd = true;
        }
    });
    repeatNewPWD.change(function(){
        inputForm.DATA.rePWD = newPWD.val();
        if(repeatNewPWD.val()== newPWD.val()){
            inputForm.STATUS.rePWD = true;
        }
    });
    //点击按钮回调
    (function(){
        var callback = {
            success : function(err,status,xhr){
                certNumTap.off("tap",tapResponse);
                showCountdown(10);
            },
            fail : function(xhr,status,error){
                alert("发送失败，请检查手机号");
                certNumTap.off("tap",tapResponse);
                showCountdown(10);
            }
        };
        //主动作AJAX
        var tapResponse =function(){
            if( check.checkIsAllOk(inputForm.DATA)) {
                AJAX.forgetPWD(inputForm.DATA, callback);
            }
        };
        newPWDdoneTAP.on({
            "tap": tapResponse
        })
    })();
});